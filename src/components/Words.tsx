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
      <div className="min-h-screen bg-slate-50 p-6 pt-20">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-2xl font-black text-slate-800">Word Jumble</h2>
          </div>
        </header>

        <div className="max-w-4xl mx-auto mt-8">
          <h1 className="text-4xl font-black text-slate-800 mb-8 text-center">Pick a Level! 📚</h1>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {[1,2,3,4,5,6,7,8,9,10].map(level => (
              <button
                key={level}
                onClick={() => {
                  setCurrentLevel(level);
                  setWordIdx(0);
                }}
                className={`aspect-square rounded-3xl flex flex-col items-center justify-center transition-all card-3d ${
                  level % 3 === 0 ? 'bg-kid-blue' : level % 3 === 1 ? 'bg-kid-green' : 'bg-kid-purple'
                } text-white shadow-xl`}
              >
                <span className="text-4xl font-black mb-1">{level}</span>
                <span className="text-xs font-bold opacity-75 uppercase">Level</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentLevel(null)} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg font-black text-slate-800 leading-tight">Level {currentLevel}</h2>
            <p className="text-xs text-slate-400 font-bold uppercase">{wordIdx + 1} / {levelWords.length} Words</p>
          </div>
        </div>
        <div className="bg-slate-100 px-4 py-2 rounded-full font-black text-slate-500">
           {currentWord?.category}
        </div>
      </header>

      <main className="max-w-2xl mx-auto mt-12 flex flex-col items-center">
        {/* Answer Slots */}
        <div className="flex gap-2 mb-12">
          {currentWord.answer.split('').map((_, i) => (
            <div 
              key={i} 
              className={`w-14 h-16 rounded-2xl border-4 flex items-center justify-center text-3xl font-black transition-all ${
                isDone ? 'border-kid-green bg-green-50 text-kid-green scale-110' : 
                userGuess[i] ? 'border-slate-800 bg-white text-slate-800' : 'border-slate-200 bg-slate-100'
              }`}
            >
              {userGuess[i] || ''}
            </div>
          ))}
        </div>

        {/* Shuffled Letters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {scrambled.map((char, i) => (
            <motion.button
              key={`${char}-${i}`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCharClick(char, i)}
              className="w-16 h-16 bg-white rounded-2xl shadow-xl border-b-4 border-slate-200 flex items-center justify-center text-3xl font-black text-slate-800 btn-bouncy"
            >
              {char}
            </motion.button>
          ))}
        </div>

        {/* Interaction Info */}
        <div className="min-h-[60px] text-center">
           {isDone ? (
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-kid-yellow fill-kid-yellow star-glow" size={32} />)}
                </div>
                <span className="text-2xl font-black text-kid-green uppercase tracking-widest">Excellent! 🌟</span>
             </motion.div>
           ) : (
             <div className="flex flex-col items-center gap-4">
                <button onClick={() => initWord(currentWord.answer)} className="text-slate-400 hover:text-slate-600 flex items-center gap-2 font-bold transition-colors">
                  <RefreshCw size={20} /> Reset
                </button>
                {showHint && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-kid-yellow/10 border-2 border-kid-yellow/20 p-4 rounded-3xl"
                  >
                    <p className="text-yellow-700 font-bold flex items-center gap-2">
                       <HelpCircle size={20} /> Hint: {currentWord.hint}
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
