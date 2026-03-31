import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Star, Trophy } from 'lucide-react';
import { useKidContext } from '../hooks/useKidContext';
import { stickersData } from '../data/stickers';
import StickerPaint from './StickerPaint';

interface Props {
  onBack: () => void;
}

const Stickers: React.FC<Props> = ({ onBack }) => {
  const { currentKid } = useKidContext();
  const [paintSticker, setPaintSticker] = useState<{ id: string; name: string } | null>(null);

  if (!currentKid) return null;

  const relevantStickers = stickersData.filter(s => s.gender === currentKid.gender || s.gender === 'both');
  const unlockedCount = Math.min(relevantStickers.length, Math.floor(currentKid.stars / 100));

  // If a sticker is selected for painting, show StickerPaint
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
          <h2 className="text-2xl font-black text-slate-800">My Stickers</h2>
        </div>
        <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-100 px-4 py-2 rounded-2xl">
          <Trophy className="text-yellow-500" size={20} />
          <span className="font-black text-yellow-700">{unlockedCount}/{relevantStickers.length} Unlocked</span>
        </div>
      </header>

      <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-xs mt-4 mb-8">
        {unlockedCount > 0
          ? '🎨 Tap an unlocked sticker to colour it in!'
          : '⭐ Earn 100 stars to unlock your first sticker!'}
      </p>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {relevantStickers.map((sticker, idx) => {
            const isUnlocked = idx < unlockedCount;
            const nextThreshold = (idx + 1) * 100;

            return (
              <motion.div
                key={sticker.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => isUnlocked && setPaintSticker({ id: sticker.id, name: sticker.name })}
                className={`relative aspect-square rounded-[2rem] flex flex-col items-center justify-center border-b-4 transition-all select-none
                  ${isUnlocked
                    ? 'bg-white border-slate-200 shadow-xl cursor-pointer hover:-translate-y-1 hover:shadow-2xl active:scale-95'
                    : 'bg-slate-100 border-transparent opacity-55 cursor-not-allowed'
                  }`}
              >
                {/* Lock icon for locked stickers */}
                {!isUnlocked && (
                  <div className="absolute top-3 right-3 text-slate-300">
                    <Lock size={18} />
                  </div>
                )}

                {/* Sticker emoji */}
                <div className={`text-5xl mb-2 transition-transform duration-300 ${isUnlocked ? 'scale-110' : 'grayscale'}`}>
                  {sticker.emoji}
                </div>

                {/* Label / unlock cost */}
                {isUnlocked ? (
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 text-center leading-tight">
                    {sticker.name}
                  </span>
                ) : (
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded-full">
                    <Star size={10} className="fill-slate-400 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-400">{nextThreshold}</span>
                  </div>
                )}

                {/* Paint brush badge on unlocked */}
                {isUnlocked && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-kid-purple rounded-full flex items-center justify-center shadow-lg text-white text-sm">
                    🎨
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>

      <div className="mt-10 text-center">
        <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">
          Earn more stars to unlock {currentKid.gender === 'boy' ? '🚗 Cars' : '🦄 Unicorns'}!
        </p>
      </div>
    </div>
  );
};

export default Stickers;
