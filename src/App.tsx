import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KidProvider, useKidContext } from './hooks/useKidContext';
import { 
  BookOpen, Hash, Palette, Languages, 
  MessageCircle, Brush, Heart, Star, 
  Plus, Settings, ChevronRight
} from 'lucide-react';
import Alphabets from './components/Alphabets';
import Words from './components/Words';
import Pet from './components/Pet';
import Coloring from './components/Coloring';
import Stickers from './components/Stickers';
import Sentences from './components/Sentences';
import GenericLearn from './components/GenericLearn';
import { numbersData, colorsData } from './data/generic';
import type { KidProfile } from './types';

const Dashboard = () => {
  const { currentKid, addStars } = useKidContext();
  const [view, setView] = useState<'dashboard' | 'alphabets' | 'numbers' | 'colors' | 'words' | 'sentences' | 'coloring' | 'pet' | 'stickers'>('dashboard');
  
  const modules = [
    { id: 'alphabets', title: 'Alphabets', icon: <Languages />, color: 'bg-kid-red', desc: 'ABC, അ, অ' },
    { id: 'numbers', title: 'Numbers', icon: <Hash />, color: 'bg-kid-blue', desc: '1, 2, 3...' },
    { id: 'colors', title: 'Colors', icon: <Palette />, color: 'bg-kid-yellow', desc: 'Red, Blue...' },
    { id: 'words', title: 'Words', icon: <BookOpen />, color: 'bg-kid-green', desc: 'Jumble Puzzles' },
    { id: 'sentences', title: 'Sentences', icon: <MessageCircle />, color: 'bg-kid-purple', desc: 'Read Aloud' },
    { id: 'coloring', title: 'Coloring', icon: <Brush />, color: 'bg-kid-pink', desc: 'Animal Fun' },
    { id: 'pet', title: 'My Pet', icon: <Heart />, color: 'bg-kid-orange', desc: 'Feed & Play' },
    { id: 'stickers', title: 'Stickers', icon: <Star />, color: 'bg-kid-cyan', desc: 'My Rewards' },
  ];

  if (!currentKid) return <KidSelector />;

  if (view !== 'dashboard') {
    if (view === 'alphabets') return <Alphabets onBack={() => setView('dashboard')} />;
    if (view === 'words') return <Words onBack={() => setView('dashboard')} />;
    if (view === 'pet') return <Pet onBack={() => setView('dashboard')} />;
    if (view === 'coloring') return <Coloring onBack={() => setView('dashboard')} />;
    if (view === 'stickers') return <Stickers onBack={() => setView('dashboard')} />;
    if (view === 'sentences') return <Sentences onBack={() => setView('dashboard')} />;
    if (view === 'numbers') return <GenericLearn title="Numbers" items={numbersData} colorClass="bg-kid-blue" onBack={() => setView('dashboard')} />;
    if (view === 'colors') return <GenericLearn title="Colors" items={colorsData} colorClass="bg-kid-yellow" onBack={() => setView('dashboard')} />;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-12 bg-slate-50">
        <h2 className="text-4xl font-black text-slate-800 mb-4">{(view as string).charAt(0).toUpperCase() + (view as string).slice(1)} Module</h2>
        <p className="text-slate-500 font-bold mb-8 italic">Coming Soon! 🚀</p>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all btn-bouncy"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-kid-purple flex items-center justify-center text-white font-bold">
            {currentKid.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{currentKid.name}</h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider">{currentKid.gender}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100 shadow-inner">
            <Star className="w-5 h-5 text-kid-yellow fill-kid-yellow star-glow" />
            <span className="font-bold text-lg text-yellow-700">{currentKid.stars}</span>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 btn-bouncy">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-20 max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">Hello, {currentKid.name}! 👋</h2>
            <p className="text-slate-500 font-medium">What do you want to learn today?</p>
          </div>
          <button onClick={() => addStars(10)} className="text-xs bg-slate-100 px-3 py-1 rounded text-slate-400 opacity-0 hover:opacity-100 transition-opacity">
            +10 Stars (Dev)
          </button>
        </div>

        {/* 2x4 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView(module.id as any)}
              className={`group cursor-pointer bg-white rounded-3xl p-6 shadow-xl border-b-4 border-slate-200 hover:border-slate-300 transition-all card-3d`}
            >
              <div className={`${module.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(module.icon as React.ReactElement<any>, { size: 32, strokeWidth: 2.5 })}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-1">{module.title}</h3>
                  <p className="text-slate-500 font-medium text-sm">{module.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                  <ChevronRight size={20} />
                </div>
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
  const [gender, setGender] = useState<KidProfile['gender']>('boy');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <h1 className="text-5xl font-black text-rainbow mb-4">KidLearn</h1>
        <p className="text-slate-500 font-bold mb-12 uppercase tracking-widest text-sm">Who is playing today?</p>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {kids.map((kid) => (
            <button
              key={kid.id}
              onClick={() => selectKid(kid.id)}
              className="flex flex-col items-center group btn-bouncy"
            >
              <div className={`w-28 h-28 rounded-full border-4 border-transparent group-hover:border-kid-purple transition-all p-1 mb-4 shadow-xl`}>
                <div className={`w-full h-full rounded-full ${kid.gender === 'boy' ? 'bg-kid-blue' : 'bg-kid-pink'} flex items-center justify-center text-white text-3xl font-black shadow-inner`}>
                  {kid.name[0]}
                </div>
              </div>
              <span className="text-xl font-black text-slate-700 group-hover:text-kid-purple transition-colors">{kid.name}</span>
            </button>
          ))}

          <button
            onClick={() => setShowAdd(true)}
            className="flex flex-col items-center group btn-bouncy"
          >
            <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600 transition-all mb-4 border-4 border-dashed border-slate-300 shadow-inner">
              <Plus size={40} />
            </div>
            <span className="text-xl font-bold text-slate-400">Add Child</span>
          </button>
        </div>

        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-200 overflow-hidden"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-6">Welcome!</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Kid's Name"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-kid-purple outline-none text-lg font-bold"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('boy')}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${gender === 'boy' ? 'bg-kid-blue text-white shadow-lg' : 'bg-white text-slate-400'}`}
                  >
                    Boy 🚗
                  </button>
                  <button
                    onClick={() => setGender('girl')}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${gender === 'girl' ? 'bg-kid-pink text-white shadow-lg' : 'bg-white text-slate-400'}`}
                  >
                    Girl 🦄
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (newName) {
                      addKid(newName, gender);
                      setShowAdd(false);
                      setNewName('');
                    }
                  }}
                  className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all shadow-xl active:scale-95"
                >
                  Let's Play! 🚀
                </button>
                <button 
                  onClick={() => setShowAdd(false)}
                  className="text-slate-400 font-bold hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
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
