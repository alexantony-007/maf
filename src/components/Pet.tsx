import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Utensils, Zap, Bath, Sparkles, Droplets } from 'lucide-react';
import { useKidContext } from '../hooks/useKidContext';

interface Props {
  onBack: () => void;
}

const Pet: React.FC<Props> = ({ onBack }) => {
  const { currentKid, updatePet, addStars } = useKidContext();
  const [action, setAction] = useState<'idle' | 'feeding' | 'bathing' | 'dressing' | 'playing'>('idle');
  const [bathStep, setBathStep] = useState<0 | 1 | 2 | 3>(0); // 0: None, 1: Water, 2: Soap, 3: Shampoo

  if (!currentKid) return null;
  const { pet } = currentKid;

  const petIcons = {
    cat: '🐱', dog: '🐶', rabbit: '🐰', elephant: '🐘', panda: '🐼'
  };

  const handleBath = () => {
    setAction('bathing');
    setBathStep(1);
  };

  const nextBathStep = () => {
    if (bathStep < 3) {
      setBathStep((s: any) => s + 1);
    } else {
      updatePet({ cleanliness: Math.min(100, pet.cleanliness + 30), happiness: Math.min(100, pet.happiness + 5) });
      setBathStep(0);
      setAction('idle');
      addStars(5);
    }
  };

  const statusColors = (val: number) => val > 70 ? 'bg-kid-green' : val > 30 ? 'bg-kid-yellow' : 'bg-kid-red';

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">My {pet.type}</h2>
        </div>
        <div className="flex items-center gap-4">
           {['happiness', 'hunger', 'cleanliness', 'energy'].map((stat) => (
             <div key={stat} className="hidden md:flex flex-col items-end gap-1">
                <span className="text-[10px] font-black uppercase text-slate-400">{stat}</span>
                <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(pet as any)[stat]}%` }}
                    className={`h-full ${statusColors((pet as any)[stat])}`}
                  />
                </div>
             </div>
           ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 mt-12 items-center">
        {/* Main Pet Stage */}
        <div className="flex-1 relative bg-white rounded-[4rem] p-12 shadow-2xl border-b-8 border-slate-100 flex flex-col items-center justify-center min-h-[500px]">
          {/* Pet Name Display */}
          <div className="absolute top-8 text-center">
             <h1 className="text-3xl font-black text-slate-800 uppercase tracking-widest">{pet.name || 'My Pet'}</h1>
             <div className="text-xs font-bold text-slate-400 uppercase">Age: {currentKid.age} Level</div>
          </div>

          {/* Background Sparks */}
          {pet.happiness > 80 && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
            >
              <Sparkles size={300} className="text-kid-yellow" />
            </motion.div>
          )}

          {/* Pet Avatar */}
          <motion.div
            animate={
              action === 'feeding' ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } :
              action === 'bathing' ? { x: [0, 5, -5, 0], rotate: [0, 2, -2, 0] } :
              action === 'playing' ? { y: [0, -40, 0] } :
              { y: [0, -10, 0] }
            }
            transition={{ duration: action === 'feeding' ? 0.3 : action === 'playing' ? 0.4 : 2, repeat: Infinity }}
            className="text-[180px] relative z-10 select-none cursor-pointer"
            onClick={() => {
                setAction('playing');
                updatePet({ happiness: Math.min(100, pet.happiness + 5), energy: Math.max(0, pet.energy - 2) });
                setTimeout(() => setAction('idle'), 1000);
            }}
          >
            {petIcons[pet.type]}
            
            {/* Bath Effects Overlay */}
            {action === 'bathing' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {bathStep === 1 && <Droplets className="text-blue-400 animate-bounce" size={80} />}
                {bathStep === 2 && <div className="w-32 h-32 bg-white/50 rounded-full blur-xl border-4 border-white animate-pulse" />}
                {bathStep === 3 && <Sparkles className="text-yellow-400 animate-spin" size={100} />}
              </motion.div>
            )}
          </motion.div>

          {/* Interaction Bubble */}
          <AnimatePresence>
            {action === 'feeding' && (
              <motion.div 
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0 }}
                className="absolute top-20 right-20 bg-kid-yellow p-4 rounded-3xl text-4xl shadow-lg"
              >
                🍎
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bathing Instructions */}
          {action === 'bathing' && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8 text-center"
            >
              <h3 className="text-2xl font-black text-slate-800 mb-2">
                {bathStep === 1 ? 'Step 1: Use Water! 🚿' : 
                 bathStep === 2 ? 'Step 2: Use Soap! 🧼' : 
                 'Step 3: Shampoo Time! 🧴'}
              </h3>
              <button 
                onClick={nextBathStep}
                className="bg-slate-800 text-white px-8 py-3 rounded-2xl font-black btn-bouncy"
              >
                Next Step →
              </button>
            </motion.div>
          )}
        </div>

        {/* Action Controls */}
        <div className="w-full md:w-64 grid grid-cols-2 md:grid-cols-1 gap-4">
          <button 
            disabled={action !== 'idle'}
            onClick={() => {
                setAction('feeding');
                setTimeout(() => {
                  updatePet({ hunger: Math.max(0, pet.hunger - 20) }); // Feed -> hunger ↓
                  setAction('idle');
                }, 2000);
            }}
            className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-b-4 border-kid-orange hover:border-orange-600 transition-all group btn-bouncy"
          >
            <div className="w-12 h-12 bg-kid-orange rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Utensils size={24} />
            </div>
            <span className="font-black text-slate-700">FEED</span>
          </button>

          <button 
            disabled={action !== 'idle'}
            onClick={handleBath}
            className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-b-4 border-kid-blue hover:border-blue-600 transition-all group btn-bouncy"
          >
            <div className="w-12 h-12 bg-kid-blue rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Bath size={24} />
            </div>
            <span className="font-black text-slate-700">CLEAN</span>
          </button>

          <button 
            disabled={action !== 'idle'}
            onClick={() => {
                setAction('playing');
                updatePet({ happiness: Math.min(100, pet.happiness + 20), energy: Math.max(0, pet.energy - 15) });
                setTimeout(() => setAction('idle'), 2000);
            }}
            className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-b-4 border-kid-pink hover:border-pink-600 transition-all group btn-bouncy"
          >
            <div className="w-12 h-12 bg-kid-pink rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <span className="font-black text-slate-700">PLAY</span>
          </button>

          <button 
            disabled={action !== 'idle'}
            onClick={() => {
                setAction('idle');
                updatePet({ energy: Math.min(100, pet.energy + 40) });
            }}
            className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-b-4 border-kid-purple hover:border-purple-600 transition-all group btn-bouncy"
          >
            <div className="w-12 h-12 bg-kid-purple rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <span className="font-black text-slate-700">SLEEP</span>
          </button>
        </div>
      </main>

      {/* Wardrobe Modal */}
      <AnimatePresence>
        {action === 'dressing' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] p-8 max-w-lg w-full shadow-2xl"
            >
              <h2 className="text-3xl font-black text-slate-800 mb-6 text-center">Pet Wardrobe 👗</h2>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {['👔', '👕', '👚', '👗', '👒', '🕶️'].map(item => (
                  <button key={item} className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center text-4xl hover:bg-kid-purple hover:text-white transition-all btn-bouncy">
                    {item}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setAction('idle')}
                className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black text-xl btn-bouncy"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pet;
