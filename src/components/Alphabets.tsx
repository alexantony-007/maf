import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Headphones, Pencil, Star, ChevronLeft } from 'lucide-react';
import { alphabetsData } from '../data/alphabets';
import { useKidContext } from '../hooks/useKidContext';
import TracingCanvas from './TracingCanvas';

interface Props {
  onBack: () => void;
}

const Alphabets: React.FC<Props> = ({ onBack }) => {
  const { addStars } = useKidContext();
  const [lang, setLang] = useState<'English' | 'Hindi' | 'Malayalam'>('English');
  const [mode, setMode] = useState<'learn' | 'trace'>('learn');
  const [selectedChar, setSelectedChar] = useState<string | null>(null);

  const speak = (char: string, voiceLang: string) => {
    const utterance = new SpeechSynthesisUtterance(char);
    utterance.lang = voiceLang;
    window.speechSynthesis.speak(utterance);
  };

  const getLangCode = (l: string) => {
    switch(l) {
      case 'Hindi': return 'hi-IN';
      case 'Malayalam': return 'ml-IN';
      default: return 'en-US';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between shadow-lg border-b border-white/20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/50 hover:bg-white rounded-2xl shadow-sm border border-white/50 btn-bouncy">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 leading-none tracking-tight">Learn Alphabets</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Discover new letters</span>
          </div>
        </div>
        
        <div className="flex bg-slate-200/50 backdrop-blur-sm p-1.5 rounded-[1.5rem] gap-1 border border-white/50">
          {(['English', 'Hindi', 'Malayalam'] as const).map((l) => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={`px-5 py-2 rounded-xl font-black transition-all text-sm ${lang === l ? 'bg-white text-slate-900 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {l === 'English' ? 'A-Z' : l === 'Hindi' ? 'अ-ज्ञ' : 'അ-റ'}
            </button>
          ))}
        </div>

        <div className="w-12 h-12 bg-kid-blue/20 rounded-2xl flex items-center justify-center text-kid-blue border-2 border-white/50">
           <Headphones size={24} />
        </div>
      </div>

      {/* Sub Nav */}
      <div className="max-w-4xl mx-auto mb-10 mt-8 flex justify-center">
        <div className="inline-flex bg-white/50 backdrop-blur-sm p-2 rounded-[2rem] gap-2 shadow-xl border border-white/50">
          <button 
            onClick={() => setMode('learn')}
            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black transition-all ${mode === 'learn' ? 'bg-kid-blue text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Headphones size={22} strokeWidth={3} />
            LEARN
          </button>
          <button 
            onClick={() => setMode('trace')}
            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black transition-all ${mode === 'trace' ? 'bg-kid-blue text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Pencil size={22} strokeWidth={3} />
            TRACE
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {mode === 'learn' ? (
            <motion.div 
              key="learn"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {alphabetsData[lang].map((a, idx) => (
                <motion.button
                  key={a.char}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => speak(a.phonetic, getLangCode(lang))}
                  className="glass-card p-10 rounded-[3rem] flex flex-col items-center justify-center aspect-square gap-4 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-[2rem] opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="text-6xl mb-1 group-hover:scale-125 transition-transform duration-500">{a.image || '✨'}</div>
                  
                  <div className="flex flex-col items-center relative z-10">
                    <span className={`text-5xl font-black tracking-tighter ${
                      idx % 5 === 0 ? 'text-kid-red' : 
                      idx % 5 === 1 ? 'text-kid-blue' : 
                      idx % 5 === 2 ? 'text-kid-green' : 
                      idx % 5 === 3 ? 'text-kid-purple' : 'text-kid-pink'
                    }`}>{a.char}</span>
                    <span className="text-2xl font-black text-slate-700 mt-1 uppercase tracking-tight">{a.word}</span>
                  </div>
                  
                  <div className="bg-slate-100/50 px-4 py-1.5 rounded-full mt-2">
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center block">{a.phonetic.split(' ')[0]}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="trace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-[3rem] shadow-xl border-2 border-slate-100 min-h-[500px]"
            >
              {selectedChar ? (
                <div className="w-full">
                  <button 
                    onClick={() => setSelectedChar(null)}
                    className="flex items-center gap-2 text-slate-400 font-bold mb-6 hover:text-slate-600 transition-colors"
                  >
                    <ChevronLeft /> Back to List
                  </button>
                  <div className="text-center mb-8">
                    <h3 className="text-4xl font-black text-slate-800">Trace the letter "{selectedChar}"</h3>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Follow the dots! ✨</p>
                  </div>
                  <TracingCanvas 
                    char={selectedChar} 
                    langCode={getLangCode(lang)} 
                    onComplete={(stars) => {
                      addStars(stars);
                      // In a real app, I'd update completion per char here
                      setTimeout(() => setSelectedChar(null), 2000);
                    }}
                  />
                </div>
              ) : (
                <div className="w-full max-w-4xl">
                   <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4">
                    {alphabetsData[lang].map((a) => (
                      <button
                        key={a.char}
                        onClick={() => setSelectedChar(a.char)}
                        className="bg-slate-50 p-6 rounded-2xl border-2 border-transparent hover:border-kid-blue hover:bg-white transition-all group"
                      >
                        <span className="text-3xl font-black text-slate-700 group-hover:text-kid-blue">{a.char}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
        <Star size={16} className="text-kid-yellow fill-kid-yellow" />
        Finish tracing to earn stars!
      </div>
    </div>
  );
};

export default Alphabets;
