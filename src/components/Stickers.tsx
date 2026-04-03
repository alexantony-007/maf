import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Star, Trophy, Sparkles, Car, Dog, Ghost } from 'lucide-react';
import { useKidContext } from '../hooks/useKidContext';
import { stickersData } from '../data/stickers';
import StickerPaint from './StickerPaint';

interface Props {
  onBack: () => void;
}

const Stickers: React.FC<Props> = ({ onBack }) => {
  const { currentKid } = useKidContext();
  const [paintSticker, setPaintSticker] = useState<{ id: string; name: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Fantasy');

  if (!currentKid) return null;

  const categories = [
    { id: 'Fantasy', icon: <Sparkles size={16} /> },
    { id: 'Vehicles', icon: <Car size={16} /> },
    { id: 'Animals', icon: <Dog size={16} /> },
    { id: 'Fun', icon: <Ghost size={16} /> },
  ];

  const filteredStickers = stickersData.filter(s => s.category === activeCategory);
  
  // Logic: 1 sticker unlocked for every 100 stars.
  // We'll show which ones are unlocked based on the index in the total list for simplicity, 
  // or use a more robust "unlockedIds" system if available.
  const totalUnlockedCount = Math.floor(currentKid.stars / 100);

  if (paintSticker) {
    return (
      <StickerPaint
        stickerId={paintSticker.id}
        stickerName={paintSticker.name}
        gender={currentKid.gender}
        onBack={() => setPaintSticker(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between shadow-lg border-b border-white/20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/50 hover:bg-white rounded-2xl shadow-sm border border-white/50 btn-bouncy">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 leading-none tracking-tight">Sticker Shop</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Collect & Paint them all!</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/50 shadow-sm">
                <Trophy className="text-kid-purple" size={20} />
                <span className="font-black text-slate-700 text-sm">{totalUnlockedCount} Unlocked</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/50 shadow-sm">
                <Star className="text-kid-yellow fill-kid-yellow" size={20} />
                <span className="font-black text-slate-700">{currentKid.stars}</span>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        {/* Category Tabs */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar justify-start md:justify-center">
            {categories.map(cat => (
                <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black transition-all ${activeCategory === cat.id ? 'bg-slate-800 text-white shadow-xl scale-110' : 'bg-white/50 backdrop-blur-sm text-slate-400 hover:bg-white hover:text-slate-600 border border-white/50 shadow-sm'}`}
                >
                    {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 20, strokeWidth: 3 })}
                    {cat.id.toUpperCase()}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {filteredStickers.map((sticker) => {
            const stickerTotalIdx = stickersData.findIndex(s => s.id === sticker.id);
            const isUnlocked = stickerTotalIdx < totalUnlockedCount;
            const threshold = (stickerTotalIdx + 1) * 100;

            return (
              <motion.div
                key={sticker.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={isUnlocked ? { scale: 1.05, rotate: [0, -2, 2, 0] } : {}}
                onClick={() => isUnlocked && setPaintSticker({ id: sticker.id, name: sticker.name })}
                className={`group relative aspect-square rounded-[3rem] flex flex-col items-center justify-center transition-all select-none
                  ${isUnlocked
                    ? 'glass-card cursor-pointer'
                    : 'bg-slate-200/50 border-4 border-dashed border-slate-300 opacity-60 grayscale'
                  }`}
              >
                {/* Sticker Emoji */}
                <span className={`text-7xl mb-2 transition-all duration-500 ${isUnlocked ? 'group-hover:scale-125 group-hover:rotate-12' : 'opacity-20'}`}>
                  {sticker.emoji}
                </span>

                <div className="text-center px-4 mt-2">
                   {isUnlocked ? (
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block opacity-0 group-hover:opacity-100 transition-opacity">{sticker.name}</span>
                   ) : (
                       <div className="flex items-center gap-2 justify-center bg-white/50 px-4 py-1.5 rounded-full shadow-inner border border-white/50">
                           <Star size={12} className="fill-kid-yellow text-kid-yellow" />
                           <span className="text-sm font-black text-slate-600">{threshold}</span>
                       </div>
                   )}
                </div>

                {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Lock size={32} className="text-slate-400/50" strokeWidth={3} />
                    </div>
                )}

                {isUnlocked && (
                     <div className="absolute -top-3 -right-3 w-12 h-12 bg-rainbow rounded-2xl flex items-center justify-center shadow-xl text-white border-4 border-white animate-bounce-slow">
                        🎨
                     </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>

      <footer className="mt-20 text-center pb-12">
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] opacity-50">Discovery Collection • Volume I</p>
      </footer>
    </div>
  );
};
export default Stickers;
