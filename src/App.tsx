import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KidProvider, useKidContext } from './hooks/useKidContext';
import { 
  BookOpen, Hash, Languages, 
  MessageCircle, Brush, Heart, Star, 
  Plus, Settings, X
} from 'lucide-react';
import Alphabets from './components/Alphabets';
import Words from './components/Words';
import Pet from './components/Pet';
import Coloring from './components/Coloring';
import Stickers from './components/Stickers';
import Stories from './components/Stories';
import GenericLearn from './components/GenericLearn';
import { numbersData } from './data/numbers';
import { colorsData } from './data/generic';
import type { Gender } from './types';

const Dashboard = () => {
  const { currentKid } = useKidContext();
  const [view, setView] = useState<'dashboard' | 'alphabets' | 'numbers' | 'colors' | 'words' | 'stories' | 'coloring' | 'pet' | 'stickers'>('dashboard');
  
  const modules = [
    { id: 'alphabets', title: 'Alphabets', icon: <Languages />, color: 'bg-kid-red', desc: 'A, B, C / അ, ആ' },
    { id: 'numbers', title: 'Numbers', icon: <Hash />, color: 'bg-kid-blue', desc: '1, 2, 3 / Count Objects' },
    { id: 'words', title: 'Jumble Game', icon: <BookOpen />, color: 'bg-kid-green', desc: '50 Levels of Puzzles' },
    { id: 'stories', title: 'Stories', icon: <MessageCircle />, color: 'bg-kid-purple', desc: 'Read Aloud & Earn Stars' },
    { id: 'coloring', title: 'Magic Paint', icon: <Brush />, color: 'bg-kid-pink', desc: 'Animal Coloring Fun' },
    { id: 'pet', title: 'My Pet', icon: <Heart />, color: 'bg-kid-orange', desc: 'Feed & Play with Buddy' },
    { id: 'stickers', title: 'Sticker Shop', icon: <Star />, color: 'bg-kid-cyan', desc: 'Unlock 100 Stickers' },
  ];

  if (!currentKid) return <KidSelector />;

  if (view !== 'dashboard') {
    if (view === 'alphabets') return <Alphabets onBack={() => setView('dashboard')} />;
    if (view === 'words') return <Words onBack={() => setView('dashboard')} />;
    if (view === 'pet') return <Pet onBack={() => setView('dashboard')} />;
    if (view === 'coloring') return <Coloring onBack={() => setView('dashboard')} />;
    if (view === 'stickers') return <Stickers onBack={() => setView('dashboard')} />;
    if (view === 'stories') return <Stories onBack={() => setView('dashboard')} />;
    if (view === 'numbers') return (
      <GenericLearn 
        title="Numbers" 
        items={numbersData.map(n => ({ char: n.value.toString(), phonetic: n.word }))} 
        colorClass="bg-kid-blue" 
        onBack={() => setView('dashboard')} 
      />
    );
    if (view === 'colors') return <GenericLearn title="Colors" items={colorsData} colorClass="bg-kid-yellow" onBack={() => setView('dashboard')} />;
    return <div onClick={() => setView('dashboard')}>Coming Soon</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${currentKid.gender === 'boy' ? 'bg-kid-blue' : 'bg-kid-pink'} flex items-center justify-center text-white font-black shadow-inner`}>
            {currentKid.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 leading-tight">{currentKid.name}</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Age {currentKid.age} • {currentKid.gender}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100 shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            <Star className="w-5 h-5 text-kid-yellow fill-kid-yellow star-glow" />
            <span className="font-black text-lg text-yellow-700">{currentKid.stars}</span>
          </div>
          <button onClick={() => window.location.reload()} className="p-2 text-slate-400 hover:text-slate-600 transition-colors btn-bouncy">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-20 max-w-6xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-tight">Hello, {currentKid.name}! 👋</h2>
          <p className="text-xl text-slate-500 font-medium tracking-tight">Ready for a new adventure today? ✨</p>
        </div>

        {/* Home Screen Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView(module.id as any)}
              className={`group cursor-pointer bg-white rounded-[2.5rem] p-8 shadow-xl border-b-8 border-slate-100 hover:shadow-2xl transition-all relative overflow-hidden`}
            >
              <div className={`${module.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(module.icon as React.ReactElement<any>, { size: 32, strokeWidth: 3 })}
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">{module.title}</h3>
                <p className="text-slate-400 font-bold text-sm tracking-wide leading-relaxed">{module.desc}</p>
              </div>
              
              <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                 {React.cloneElement(module.icon as React.ReactElement<any>, { size: 120, strokeWidth: 3 })}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

const KidSelector = () => {
  const { kids, addKid, selectKid } = useKidContext();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [age, setAge] = useState(4);
  const [gender, setGender] = useState<Gender>('boy');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-kid-pink/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-kid-blue/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        <h1 className="text-6xl md:text-7xl font-black text-rainbow mb-6 drop-shadow-sm">Grace Learn</h1>
        <p className="text-slate-400 font-black mb-12 uppercase tracking-[0.2em] text-sm">Welcome to your learning world</p>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {kids.map((kid) => (
            <button
              key={kid.id}
              onClick={() => selectKid(kid.id)}
              className="flex flex-col items-center group btn-bouncy"
            >
              <div className={`w-32 h-32 rounded-[2.5rem] p-1.5 mb-4 shadow-xl group-hover:rotate-6 transition-all bg-gradient-to-br ${kid.gender === 'boy' ? 'from-kid-blue to-blue-600' : 'from-kid-pink to-pink-600'}`}>
                <div className={`w-full h-full rounded-[2rem] bg-white flex items-center justify-center text-5xl font-black shadow-inner ${kid.gender === 'boy' ? 'text-kid-blue' : 'text-kid-pink'}`}>
                  {kid.name[0]}
                </div>
              </div>
              <span className="text-2xl font-black text-slate-700 group-hover:text-slate-900 transition-colors">{kid.name}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Age {kid.age}</span>
            </button>
          ))}

          <button
            onClick={() => setShowAdd(true)}
            className="flex flex-col items-center group btn-bouncy"
          >
            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-100 group-hover:text-slate-500 transition-all mb-4 border-4 border-dashed border-slate-200 shadow-inner">
              <Plus size={48} strokeWidth={3} />
            </div>
            <span className="text-2xl font-bold text-slate-300">New Kid</span>
          </button>
        </div>

        <AnimatePresence>
          {showAdd && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-[3.5rem] p-10 max-w-lg w-full shadow-2xl relative"
              >
                <button onClick={() => setShowAdd(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-500">
                    <X size={32} strokeWidth={3} />
                </button>

                <h2 className="text-4xl font-black text-slate-800 mb-8 mt-4">Welcome aboard! 🎈</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-left text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-2">What is your name?</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-4 border-transparent focus:border-kid-purple/20 focus:bg-white outline-none text-2xl font-black placeholder:text-slate-300 transition-all"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-left text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-2">How old are you?</label>
                        <select 
                           value={age}
                           onChange={(e) => setAge(parseInt(e.target.value))}
                           className="w-full px-6 py-4 rounded-3xl bg-slate-50 border-4 border-transparent focus:border-kid-purple/20 outline-none text-xl font-black transition-all"
                        >
                            {[3, 4, 5, 6, 7].map(a => <option key={a} value={a}>{a} years old</option>)}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-left text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Are you a...</label>
                        <div className="flex gap-2">
                           <button onClick={() => setGender('boy')} className={`flex-1 py-4 rounded-[1.5rem] text-2xl transition-all shadow-sm ${gender === 'boy' ? 'bg-kid-blue shadow-lg scale-105' : 'bg-slate-50 opacity-40'}`}>🚗</button>
                           <button onClick={() => setGender('girl')} className={`flex-1 py-4 rounded-[1.5rem] text-2xl transition-all shadow-sm ${gender === 'girl' ? 'bg-kid-pink shadow-lg scale-105' : 'bg-slate-50 opacity-40'}`}>🦄</button>
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
                      className="w-full bg-slate-800 text-white py-6 rounded-3xl font-black text-2xl hover:bg-slate-900 transition-all shadow-xl active:scale-95 mt-4"
                    >
                      Start Learning! 🚀
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  };
  
  const App = () => {
    return (
      <KidProvider>
        <Dashboard />
      </KidProvider>
    );
  };
  
  export default App;
