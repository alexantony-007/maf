import React, { createContext, useContext, useState, useEffect } from 'react';
import type { KidProfile, Gender, PetState } from '../types';

interface ParentProfile {
  id: string;
  contact: string; // Email or Mobile
  type: 'email' | 'mobile';
}

interface KidContextType {
  kids: KidProfile[];
  currentKid: KidProfile | null;
  parent: ParentProfile | null;
  addKid: (name: string, age: number, gender: Gender) => void;
  selectKid: (id: string | null) => void;
  addStars: (amount: number) => void;
  unlockSticker: (id: string) => void;
  updatePet: (update: Partial<PetState>) => void;
  loginParent: (contact: string, type: 'email' | 'mobile') => void;
  logoutParent: () => void;
}

const KidContext = createContext<KidContextType | undefined>(undefined);

export const KidProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parent, setParent] = useState<ParentProfile | null>(() => {
    const saved = localStorage.getItem('kid_learn_parent');
    return saved ? JSON.parse(saved) : null;
  });

  const [kids, setKids] = useState<KidProfile[]>(() => {
    const saved = localStorage.getItem('kid_learn_kids');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentKidId, setCurrentKidId] = useState<string | null>(() => {
    return localStorage.getItem('kid_learn_active_id');
  });

  const currentKid = kids.find(k => k.id === currentKidId) || null;

  useEffect(() => {
    localStorage.setItem('kid_learn_kids', JSON.stringify(kids));
  }, [kids]);

  useEffect(() => {
    if (parent) localStorage.setItem('kid_learn_parent', JSON.stringify(parent));
    else localStorage.removeItem('kid_learn_parent');
  }, [parent]);

  useEffect(() => {
    if (currentKidId) localStorage.setItem('kid_learn_active_id', currentKidId);
    else localStorage.removeItem('kid_learn_active_id');
  }, [currentKidId]);

  const loginParent = (contact: string, type: 'email' | 'mobile') => {
    const newParent: ParentProfile = { id: Date.now().toString(), contact, type };
    setParent(newParent);
  };

  const logoutParent = () => {
    setParent(null);
    setCurrentKidId(null);
  };

  const addKid = (name: string, age: number, gender: Gender) => {
    const newKid: KidProfile = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      name,
      age,
      gender,
      stars: 0,
      unlockedStickers: [],
      pet: {
        name: 'Buddy',
        type: 'cat',
        happiness: 80,
        hunger: 20,
        cleanliness: 80,
        energy: 100,
        unlockedItems: []
      },
      progress: {
        alphabets: {},
        wordsLevel: 1,
        storiesLevel: 1,
        numbersLevel: 1
      }
    };
    setKids(prev => [...prev, newKid]);
    if (!currentKidId) setCurrentKidId(newKid.id);
  };

  const selectKid = (id: string | null) => setCurrentKidId(id);

  const addStars = (amount: number) => {
    setKids(prev => prev.map(k => k.id === currentKidId ? { ...k, stars: k.stars + amount } : k));
  };

  const unlockSticker = (id: string) => {
    setKids(prev => prev.map(k => k.id === currentKidId ? { ...k, unlockedStickers: [...new Set([...k.unlockedStickers, id])] } : k));
  };

  const updatePet = (update: Partial<PetState>) => {
    setKids(prev => prev.map(k => k.id === currentKidId ? { ...k, pet: { ...k.pet, ...update } } : k));
  };

  return (
    <KidContext.Provider value={{ kids, currentKid, parent, addKid, selectKid, addStars, unlockSticker, updatePet, loginParent, logoutParent }}>
      {children}
    </KidContext.Provider>
  );
};

export const useKidContext = () => {
  const context = useContext(KidContext);
  if (!context) throw new Error('useKidContext must be used within a KidProvider');
  return context;
};
