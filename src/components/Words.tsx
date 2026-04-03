import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, HelpCircle, RefreshCw } from 'lucide-react';
import { wordsLevels } from '../data/words';
import { useKidContext } from '../hooks/useKidContext';

interface Props {
  onBack: () => void;
}

const Words: React.FC<Props> = ({ onBack }) => {
  const { addStars } = useKidContext();
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [userGuess, setUserGuess] = useState<string[]>([]);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const levelWords = currentLevel ? wordsLevels[currentLevel] || [] : [];
  const currentWord = levelWords[wordIdx];

  useEffect(() => {
    if (currentWord) {
      initWord(currentWord.answer);
    }
  }, [currentWord]);

  const initWord = (word: string) => {
    const letters = word.split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setScrambled(shuffled);
    setUserGuess([]);
    setMistakes(0);
    setIsDone(false);
    setShowHint(false);
  };

  const handleCharClick = (char: string, idx: number) => {
    if (isDone) return;
    setUserGuess(prev => [...prev, char]);
    const newScrambled = [...scrambled];
    newScrambled.splice(idx, 1);
    setScrambled(newScrambled);

    const newGuess = [...userGuess, char].join('');
    if (newGuess.length === currentWord.answer.length) {
      if (newGuess === currentWord.answer) {
        setIsDone(true);
        addStars(5);
        setTimeout(() => {
          if (wordIdx < levelWords.length - 1) {
            setWordIdx(idx => idx + 1);
          } else {
             // Level complete
             setCurrentLevel(null);
          }
        }, 1500);
      } else {
        // Wrong
        setMistakes(m => m + 1);
        if (mistakes + 1 >= 5) setShowHint(true);
        // Reset after a short delay
        setTimeout(() => initWord(currentWord.answer), 500);
      }
    }
  };

  if (currentLevel === null) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 pt-20 flex flex-col items-center">
        <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between shadow-lg border-b border-white/20">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/50 hover:bg-white rounded-2xl shadow-sm border border-white/50 btn-bouncy">
              <ArrowLeft size={24} className="text-slate-600" />
            </button>
            <div className="flex flex-col">
                <h2 className="text-xl font-black text-slate-800 leading-none tracking-tight">Word Jumble</h2>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Unscramble the fun!</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl w-full mt-12 bg-white/50 backdrop-blur-sm p-12 rounded-[4rem] border border-white/50 shadow-xl">
          <h1 className="text-5xl font-black text-slate-800 mb-12 text-center tracking-tight">Pick a <span className="text-rainbow">Level</span>! 📚</h1>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
            {Object.keys(wordsLevels).map(Number).sort((a, b) => a - b).map(level => (
              <button
                key={level}
                onClick={() => {
                  setCurrentLevel(level);
                  setWordIdx(0);
                }}
                className={`aspect-square rounded-[2.5rem] flex flex-col items-center justify-center transition-all glass-card hover:scale-110 active:scale-95 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity ${
                    level % 3 === 0 ? 'bg-kid-blue' : level % 3 === 1 ? 'bg-kid-green' : 'bg-kid-purple'
                }`} />
                <span className={`text-5xl font-black mb-1 relative z-10 ${
                    level % 3 === 0 ? 'text-kid-blue' : level % 3 === 1 ? 'text-kid-green' : 'text-kid-purple'
                }`}>{level}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">LEVEL</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between shadow-lg border-b border-white/20">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentLevel(null)} className="p-3 bg-white/50 hover:bg-white rounded-2xl shadow-sm border border-white/50 btn-bouncy">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg font-black text-slate-800 leading-tight">Level {currentLevel}</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{wordIdx + 1} / {levelWords.length} Words</p>
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm px-5 py-2 rounded-2xl border border-white/50 font-black text-slate-500 shadow-sm text-sm uppercase tracking-widest">
           {currentWord?.category}
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-20 flex flex-col items-center">
        {/* Answer Slots */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {currentWord.answer.split('').map((_, i) => (
            <motion.div 
              key={i} 
              initial={false}
              animate={isDone ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : {}}
              className={`w-16 h-20 rounded-[1.5rem] border-4 flex items-center justify-center text-4xl font-black transition-all shadow-sm ${
                isDone ? 'border-kid-green bg-green-50 text-kid-green' : 
                userGuess[i] ? 'border-slate-800 bg-white text-slate-800 shadow-lg' : 'border-slate-100 bg-white/30'
              }`}
            >
              {userGuess[i] || ''}
            </motion.div>
          ))}
        </div>

        {/* Shuffled Letters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {scrambled.map((char, i) => (
            <motion.button
              key={`${char}-${i}`}
              whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCharClick(char, i)}
              className="w-20 h-20 bg-white rounded-[2rem] shadow-xl border-b-8 border-slate-100 flex items-center justify-center text-4xl font-black text-slate-800 btn-bouncy hover:border-kid-blue transition-colors"
            >
              {char}
            </motion.button>
          ))}
        </div>

        {/* Interaction Info */}
        <div className="min-h-[100px] flex flex-col items-center justify-center w-full">
           {isDone ? (
             <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-kid-yellow fill-kid-yellow star-glow" size={40} />)}
                </div>
                <span className="text-3xl font-black text-kid-green uppercase tracking-[0.2em] drop-shadow-sm">Excellent! 🌟</span>
             </motion.div>
           ) : (
             <div className="flex flex-col items-center gap-8 w-full">
                <button onClick={() => initWord(currentWord.answer)} className="px-6 py-3 bg-white/50 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-600 flex items-center gap-2 font-black transition-all shadow-sm border border-white/50 uppercase tracking-widest text-xs">
                  <RefreshCw size={16} strokeWidth={3} /> Try Again
                </button>
                {showHint && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 rounded-[2.5rem] w-full max-w-md relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-kid-yellow" />
                    <p className="text-slate-700 font-black text-lg flex items-center gap-3">
                       <HelpCircle size={24} className="text-kid-yellow" strokeWidth={3} /> 
                       Hint: <span className="text-slate-500 font-bold">{currentWord.hint}</span>
                    </p>
                  </motion.div>
                )}
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default Words;
