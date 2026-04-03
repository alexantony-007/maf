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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 leading-tight">Sticker Shop</h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Collect them all!</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-kid-purple/10 px-4 py-2 rounded-2xl border border-kid-purple/20">
                <Trophy className="text-kid-purple" size={20} />
                <span className="font-black text-kid-purple text-sm">{totalUnlockedCount} Unlocked</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-200">
                <Star className="text-kid-yellow fill-kid-yellow" size={20} />
                <span className="font-black text-yellow-700">{currentKid.stars}</span>
            </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
            {categories.map(cat => (
                <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${activeCategory === cat.id ? 'bg-slate-800 text-white shadow-lg scale-105' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
                >
                    {cat.icon}
                    {cat.id}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
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
                onClick={() => isUnlocked && setPaintSticker({ id: sticker.id, name: sticker.name })}
                className={`group relative aspect-square rounded-[2.5rem] flex flex-col items-center justify-center border-b-8 transition-all select-none
                  ${isUnlocked
                    ? 'bg-white border-slate-100 shadow-xl cursor-pointer hover:-translate-y-2 hover:shadow-2xl'
                    : 'bg-slate-200 border-transparent opacity-40 grayscale'
                  }`}
              >
                {/* Sticker Emoji */}
                <span className="text-6xl mb-2 group-hover:scale-125 transition-transform duration-500">
                  {sticker.emoji}
                </span>

                <div className="text-center px-2">
                   {isUnlocked ? (
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sticker.name}</span>
                   ) : (
                       <div className="flex items-center gap-1 justify-center bg-white/80 px-2 py-1 rounded-full">
                           <Star size={10} className="fill-kid-yellow text-kid-yellow" />
                           <span className="text-[10px] font-black text-slate-600">{threshold}</span>
                       </div>
                   )}
                </div>

                {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 rounded-[2.5rem]">
                        <Lock size={24} className="text-slate-400" />
                    </div>
                )}

                {isUnlocked && (
                     <div className="absolute -top-2 -right-2 w-10 h-10 bg-kid-purple rounded-full flex items-center justify-center shadow-lg text-white border-4 border-white">
                        🎨
                     </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>

      <footer className="mt-16 text-center">
          <p className="text-slate-300 font-black uppercase tracking-[0.2em] text-xs">More stickers coming soon in next levels! 🚀</p>
      </footer>
    </div>
  );
};
export default Stickers;
