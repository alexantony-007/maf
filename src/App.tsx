import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KidProvider, useKidContext } from './hooks/useKidContext';
import { 
  BookOpen, Hash, Languages, 
  MessageCircle, Brush, Heart, Star, 
  Plus, X, LogOut, User, UserRound
} from 'lucide-react';
import Alphabets from './components/Alphabets';
import Words from './components/Words';
import Pet from './components/Pet';
import Coloring from './components/Coloring';
import Stickers from './components/Stickers';
import Stories from './components/Stories';
import Numbers from './components/Numbers';
import GenericLearn from './components/GenericLearn';
import ParentAuth from './components/ParentAuth';
import { colorsData } from './data/generic';
import type { Gender } from './types';

const Dashboard = () => {
  const { currentKid, parent, logoutParent, selectKid } = useKidContext();
  const [view, setView] = useState<'dashboard' | 'alphabets' | 'numbers' | 'colors' | 'words' | 'stories' | 'coloring' | 'pet' | 'stickers'>('dashboard');
  
  if (!parent) return <ParentAuth />;
  if (!currentKid) return <KidSelector />;

  const modules = [
    { id: 'alphabets', title: 'Alphabets', icon: <Languages />, color: 'bg-kid-red', desc: 'A, B, C / അ, ആ' },
    { id: 'numbers', title: 'Numbers', icon: <Hash />, color: 'bg-kid-blue', desc: '1, 2, 3 / Count Objects' },
    { id: 'words', title: 'Jumble Game', icon: <BookOpen />, color: 'bg-kid-green', desc: '50 Levels of Puzzles' },
    { id: 'stories', title: 'Stories', icon: <MessageCircle />, color: 'bg-kid-purple', desc: 'Read Aloud & Earn Stars' },
    { id: 'coloring', title: 'Magic Paint', icon: <Brush />, color: 'bg-kid-pink', desc: 'Animal Coloring Fun' },
    { id: 'pet', title: 'My Pet', icon: <Heart />, color: 'bg-kid-orange', desc: 'Feed & Play with Buddy' },
    { id: 'stickers', title: 'Sticker Shop', icon: <Star />, color: 'bg-kid-cyan', desc: 'Unlock 100 Stickers' },
  ];

  if (view !== 'dashboard') {
    if (view === 'alphabets') return <Alphabets onBack={() => setView('dashboard')} />;
    if (view === 'words') return <Words onBack={() => setView('dashboard')} />;
    if (view === 'pet') return <Pet onBack={() => setView('dashboard')} />;
    if (view === 'coloring') return <Coloring onBack={() => setView('dashboard')} />;
    if (view === 'stickers') return <Stickers onBack={() => setView('dashboard')} />;
    if (view === 'stories') return <Stories onBack={() => setView('dashboard')} />;
    if (view === 'numbers') return <Numbers onBack={() => setView('dashboard')} />;
    if (view === 'colors') return <GenericLearn title="Colors" items={colorsData} colorClass="bg-kid-yellow" onBack={() => setView('dashboard')} />;
    return <div onClick={() => setView('dashboard')}>Coming Soon</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center shadow-lg border-b border-white/20">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            onClick={() => selectKid(null)}
            className={`w-12 h-12 rounded-2xl cursor-pointer ${currentKid.gender === 'boy' ? 'bg-kid-blue' : 'bg-kid-pink'} flex items-center justify-center text-white font-black shadow-xl border-2 border-white/50 hover:scale-110 transition-transform`}
          >
            {currentKid.name[0]}
          </motion.div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 leading-none tracking-tight">{currentKid.name}</h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none mt-1">Age {currentKid.age} • Explorer</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/50 shadow-sm transition-all hover:bg-white hover:shadow-md cursor-pointer group">
            <Star className="w-5 h-5 text-kid-yellow fill-kid-yellow star-glow group-hover:scale-125 transition-transform" />
            <span className="font-black text-xl text-slate-700">{currentKid.stars}</span>
          </div>
          <button onClick={logoutParent} className="p-3 text-slate-400 hover:text-red-500 transition-all hover:scale-110 bg-white/50 rounded-2xl border border-white/50 shadow-sm group relative">
            <LogOut className="w-5 h-5" />
            <span className="absolute -bottom-10 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest whitespace-nowrap shadow-xl">Exit Parent Portal</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-28 max-w-6xl mx-auto px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-3 leading-tight tracking-tighter">
            Hello, <span className="text-rainbow">{currentKid.name}</span>! 👋
          </h2>
          <p className="text-xl text-slate-500 font-bold tracking-tight">Ready for a new adventure today? ✨</p>
        </motion.div>

        {/* Home Screen Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView(module.id as any)}
              className="group cursor-pointer glass-card p-10 rounded-[3.5rem] relative overflow-hidden"
            >
              {/* Dynamic Gradient Background Glow */}
              <div className={`absolute -top-12 -right-12 w-40 h-40 ${module.color.replace('bg-', 'bg-')}/10 blur-[60px] group-hover:blur-[40px] transition-all`} />
              
              <div className={`${module.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl group-hover:rotate-12 transition-all duration-500 border-4 border-white/30`}>
                {React.cloneElement(module.icon as React.ReactElement<any>, { size: 40, strokeWidth: 3 })}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-slate-800 mb-2 group-hover:tracking-tight transition-all">{module.title}</h3>
                <p className="text-slate-500 font-bold text-sm tracking-wide leading-relaxed opacity-80">{module.desc}</p>
              </div>
              
              {/* Floating Icon Background Decor */}
              <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-all group-hover:scale-125 duration-700">
                 {React.cloneElement(module.icon as React.ReactElement<any>, { size: 140, strokeWidth: 3 })}
              </div>
              
              {/* Interaction Hint */}
              <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                Play Now <Plus size={14} strokeWidth={4} />
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

const KidSelector = () => {
  const { kids, addKid, selectKid, logoutParent, parent } = useKidContext();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [age, setAge] = useState(4);
  const [gender, setGender] = useState<Gender>('boy');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Logout Parent helper */}
      <div className="absolute top-10 right-10 z-50">
        <button onClick={logoutParent} className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-400 font-black text-[10px] uppercase tracking-widest transition-all">
          <LogOut size={16} strokeWidth={3} /> Not {parent?.contact}?
        </button>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-kid-pink/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-kid-blue/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        <h1 className="text-7xl md:text-8xl font-black text-rainbow mb-6 drop-shadow-xl select-none">KidsPlay</h1>
        <p className="text-slate-400 font-black mb-16 uppercase tracking-[0.3em] text-xs leading-none">Choose your profile • Have fun</p>

        <div className="flex flex-wrap justify-center gap-12 mb-16">
          {kids.map((kid) => (
            <button
              key={kid.id}
              onClick={() => selectKid(kid.id)}
              className="flex flex-col items-center group btn-bouncy"
            >
              <div className={`w-40 h-40 rounded-[3.5rem] p-2 mb-6 shadow-2xl group-hover:rotate-6 transition-all bg-gradient-to-br ${kid.gender === 'boy' ? 'from-kid-blue to-blue-600' : 'from-kid-pink to-pink-600'}`}>
                <div className={`w-full h-full rounded-[3rem] bg-white flex items-center justify-center text-6xl font-black shadow-inner ${kid.gender === 'boy' ? 'text-kid-blue' : 'text-kid-pink'}`}>
                  {kid.name[0]}
                </div>
              </div>
              <span className="text-3xl font-black text-slate-700 group-hover:text-slate-900 transition-colors tracking-tight">{kid.name}</span>
              <div className="mt-2 flex items-center gap-2">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full">Age {kid.age}</span>
                 <div className="w-2 h-2 rounded-full bg-kid-green animate-pulse" />
              </div>
            </button>
          ))}

          <button
            onClick={() => setShowAdd(true)}
            className="flex flex-col items-center group btn-bouncy"
          >
            <div className="w-40 h-40 rounded-[3.5rem] bg-white/50 backdrop-blur-sm flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-slate-500 transition-all mb-6 border-4 border-dashed border-slate-200 shadow-inner group-hover:shadow-xl">
              <Plus size={64} strokeWidth={3} />
            </div>
            <span className="text-3xl font-bold text-slate-300">New Friend</span>
          </button>
        </div>

        <AnimatePresence>
          {showAdd && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-2xl">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 40 }}
                className="bg-white rounded-[4rem] p-12 max-w-lg w-full shadow-[0_32px_64px_rgba(0,0,0,0.2)] relative border-4 border-white"
              >
                <button onClick={() => setShowAdd(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-500 transition-all">
                    <X size={36} strokeWidth={4} />
                </button>

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-kid-yellow/20 rounded-3xl flex items-center justify-center text-4xl mb-6 mx-auto">🎈</div>
                    <h2 className="text-5xl font-black text-slate-800 leading-tight">Welcome!</h2>
                    <p className="text-slate-400 font-bold mt-2">Let's create your profile</p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-4">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      autoFocus
                      className="w-full px-10 py-6 rounded-[2.5rem] bg-slate-50 border-4 border-transparent focus:border-kid-purple/20 focus:bg-white outline-none text-2xl font-black placeholder:text-slate-300 transition-all shadow-inner"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-4">Age</label>
                        <select 
                           value={age}
                           onChange={(e) => setAge(parseInt(e.target.value))}
                           className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-4 border-transparent focus:border-kid-purple/20 outline-none text-xl font-black transition-all appearance-none cursor-pointer shadow-inner"
                        >
                            {[3, 4, 5, 6, 7, 8, 9, 10].map(a => <option key={a} value={a}>{a} Years</option>)}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-4">Gender</label>
                        <div className="flex gap-3">
                           <button onClick={() => setGender('boy')} className={`flex-1 py-5 rounded-[2rem] flex flex-col items-center justify-center transition-all shadow-sm ${gender === 'boy' ? 'bg-kid-blue text-white shadow-lg scale-110' : 'bg-slate-50 text-slate-400 opacity-60'}`}>
                             <User size={32} strokeWidth={3} />
                             <span className="text-[10px] font-black mt-1 uppercase tracking-widest leading-none">Boy</span>
                           </button>
                           <button onClick={() => setGender('girl')} className={`flex-1 py-5 rounded-[2rem] flex flex-col items-center justify-center transition-all shadow-sm ${gender === 'girl' ? 'bg-kid-pink text-white shadow-lg scale-110' : 'bg-slate-50 text-slate-400 opacity-60'}`}>
                             <UserRound size={32} strokeWidth={3} />
                             <span className="text-[10px] font-black mt-1 uppercase tracking-widest leading-none">Girl</span>
                           </button>
                        </div>
                    </div>
                  </div>

                    <button
                      onClick={() => {
                        if (newName) {
                          addKid(newName, age, gender);
                          setShowAdd(false);
                          setNewName('');
                        }
                      }}
                      className="w-full bg-rainbow text-white py-8 rounded-[2.5rem] font-black text-3xl hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all active:scale-95 mt-6 shadow-xl border-t-4 border-white/20"
                    >
                      LET'S PLAY! 🚀
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
}

const App = () => {
  return (
    <KidProvider>
      <Dashboard />
    </KidProvider>
  );
};

export default App;
