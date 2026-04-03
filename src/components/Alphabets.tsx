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
  const [lang, setLang] = useState<'english' | 'hindi' | 'malayalam'>('english');
  const [mode, setMode] = useState<'learn' | 'trace'>('learn');
  const [selectedChar, setSelectedChar] = useState<string | null>(null);

  const speak = (char: string, voiceLang: string) => {
    const utterance = new SpeechSynthesisUtterance(char);
    utterance.lang = voiceLang;
    window.speechSynthesis.speak(utterance);
  };

  const getLangCode = (l: string) => {
    switch(l) {
      case 'hindi': return 'hi-IN';
      case 'malayalam': return 'ml-IN';
      default: return 'en-US';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black text-slate-800">Learn Alphabets</h2>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
          <button 
            onClick={() => setLang('english')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${lang === 'english' ? 'bg-kid-pink text-white shadow-md' : 'text-slate-500'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang('hindi')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${lang === 'hindi' ? 'bg-kid-purple text-white shadow-md' : 'text-slate-500'}`}
          >
            हिंदी
          </button>
          <button 
            onClick={() => setLang('malayalam')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${lang === 'malayalam' ? 'bg-kid-green text-white shadow-md' : 'text-slate-500'}`}
          >
            മലയാളം
          </button>
        </div>

        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Sub Nav */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-center">
        <div className="inline-flex bg-slate-100 p-1 rounded-2xl gap-1 shadow-inner">
          <button 
            onClick={() => setMode('learn')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${mode === 'learn' ? 'bg-kid-blue text-white shadow-md' : 'text-slate-400'}`}
          >
            <Headphones size={20} />
            Learn
          </button>
          <button 
            onClick={() => setMode('trace')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${mode === 'trace' ? 'bg-kid-blue text-white shadow-md' : 'text-slate-400'}`}
          >
            <Pencil size={20} />
            Trace
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {mode === 'learn' ? (
            <motion.div 
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {alphabetsData[lang].map((a, idx) => (
                <motion.button
                  key={a.char}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => speak(a.phonetic, getLangCode(lang))}
                  className={`bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 border-slate-100 hover:border-kid-blue transition-all flex flex-col items-center justify-center aspect-square gap-3`}
                >
                  <div className="text-6xl mb-2">{a.image}</div>
                  <div className="flex flex-col items-center">
                    <span className={`text-4xl font-black ${
                      idx % 5 === 0 ? 'text-kid-red' : 
                      idx % 5 === 1 ? 'text-kid-blue' : 
                      idx % 5 === 2 ? 'text-kid-green' : 
                      idx % 5 === 3 ? 'text-kid-purple' : 'text-kid-pink'
                    }`}>{a.char} / {a.char.toLowerCase()}</span>
                    <span className="text-2xl font-black text-slate-700 mt-1">{a.word}</span>
                  </div>
                  <div className="bg-slate-50 px-4 py-2 rounded-2xl">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center block leading-relaxed">{a.phonetic}</span>
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
