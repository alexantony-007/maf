import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Headphones, Pencil, Star, ChevronLeft, Hash } from 'lucide-react';
import { numbersData } from '../data/numbers';
import { useKidContext } from '../hooks/useKidContext';
import TracingCanvas from './TracingCanvas';

interface Props {
  onBack: () => void;
}

const Numbers: React.FC<Props> = ({ onBack }) => {
  const { addStars } = useKidContext();
  const [mode, setMode] = useState<'learn' | 'trace'>('learn');
  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  const speak = (val: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(val);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // Limit tracing to 1-20 for better UX, or show all
  const displayNumbers = numbersData.slice(0, 50); // Show first 50 numbers for learning

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between shadow-lg border-b border-white/20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/50 hover:bg-white rounded-2xl shadow-sm border border-white/50 btn-bouncy">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 leading-none tracking-tight">Number Magic</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Count & Trace with fun</span>
          </div>
        </div>
        
        <div className="w-12 h-12 bg-kid-blue/20 rounded-2xl flex items-center justify-center text-kid-blue border-2 border-white/50">
           <Hash size={24} />
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
              {displayNumbers.map((n, idx) => (
                <motion.button
                  key={n.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.01 }}
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => speak(n.value.toString())}
                  className="glass-card p-10 rounded-[3rem] flex flex-col items-center justify-center aspect-square gap-4 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-[2rem] opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col items-center relative z-10">
                    <span className={`text-6xl font-black tracking-tighter ${
                      idx % 5 === 0 ? 'text-kid-red' : 
                      idx % 5 === 1 ? 'text-kid-blue' : 
                      idx % 5 === 2 ? 'text-kid-green' : 
                      idx % 5 === 3 ? 'text-kid-purple' : 'text-kid-pink'
                    }`}>{n.value}</span>
                    <span className="text-xl font-black text-slate-400 mt-2 uppercase tracking-widest">{n.word}</span>
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
              {selectedNum !== null ? (
                <div className="w-full">
                  <button 
                    onClick={() => setSelectedNum(null)}
                    className="flex items-center gap-2 text-slate-400 font-bold mb-6 hover:text-slate-600 transition-colors"
                  >
                    <ChevronLeft /> Back to Numbers
                  </button>
                  <div className="text-center mb-8">
                    <h3 className="text-4xl font-black text-slate-800">Trace the number "{selectedNum}"</h3>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Follow the dots! ✨</p>
                  </div>
                  <TracingCanvas 
                    char={selectedNum.toString()} 
                    langCode="en-US" 
                    onComplete={(stars) => {
                      addStars(stars);
                      setTimeout(() => setSelectedNum(null), 2000);
                    }}
                  />
                </div>
              ) : (
                <div className="w-full max-w-4xl">
                   <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4">
                    {displayNumbers.slice(0, 10).map((n) => (
                      <button
                        key={n.value}
                        onClick={() => setSelectedNum(n.value)}
                        className="bg-slate-50 p-8 rounded-3xl border-2 border-transparent hover:border-kid-blue hover:bg-white transition-all group shadow-sm hover:shadow-xl"
                      >
                        <span className="text-4xl font-black text-slate-700 group-hover:text-kid-blue">{n.value}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-12 p-8 bg-blue-50 rounded-[2rem] border-2 border-blue-100/50 text-center">
                      <p className="text-blue-500 font-black uppercase tracking-widest text-sm">More numbers coming soon to tracing! 🚀</p>
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
        Trace correctly to earn bonus stars!
      </div>
    </div>
  );
};

export default Numbers;
