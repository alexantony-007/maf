import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Headphones, Star } from 'lucide-react';

interface LearnItem {
  char: string;
  phonetic: string;
  hex?: string;
}

interface Props {
  title: string;
  items: LearnItem[];
  colorClass: string;
  onBack: () => void;
}

const GenericLearn: React.FC<Props> = ({ title, items, colorClass, onBack }) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${colorClass} text-white flex items-center justify-center shadow-lg`}>
           <Headphones size={24} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {items.map((item, idx) => (
            <motion.button
              key={item.char}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => speak(item.hex ? item.char : item.phonetic)}
              className="bg-white p-8 rounded-[3rem] shadow-xl border-b-8 border-slate-100 flex flex-col items-center justify-center aspect-square gap-4 hover:border-slate-200 transition-all group"
            >
              {item.hex ? (
                <div 
                  className="w-24 h-24 rounded-full shadow-inner border-4 border-white transition-transform group-hover:scale-110" 
                  style={{ backgroundColor: item.hex }} 
                />
              ) : (
                <span className={`text-7xl font-black ${
                    idx % 3 === 0 ? 'text-kid-red' : idx % 3 === 1 ? 'text-kid-blue' : 'text-kid-green'
                }`}>
                  {item.char}
                </span>
              )}
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">{item.phonetic}</span>
            </motion.button>
          ))}
        </div>
      </main>

      <footer className="mt-12 text-center text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
        <Star size={16} className="text-kid-yellow fill-kid-yellow" />
        Click a card to hear the sound!
      </footer>
    </div>
  );
};

export default GenericLearn;
