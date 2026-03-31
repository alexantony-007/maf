import React, { createContext, useContext, useState, useEffect } from 'react';
import type { KidProfile, Gender, PetState } from '../types';

interface KidContextType {
  kids: KidProfile[];
  currentKid: KidProfile | null;
  addKid: (name: string, gender: Gender) => void;
  selectKid: (id: string) => void;
  addStars: (amount: number) => void;
  unlockSticker: (id: string) => void;
  updatePet: (update: Partial<PetState>) => void;
}

const KidContext = createContext<KidContextType | undefined>(undefined);

export const KidProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    if (currentKidId) localStorage.setItem('kid_learn_active_id', currentKidId);
  }, [currentKidId]);

  const addKid = (name: string, gender: Gender) => {
    const newKid: KidProfile = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      name,
      gender,
      stars: 0,
      unlockedStickers: [],
      pet: {
        type: 'cat',
        happiness: 80,
        hunger: 80,
        cleanliness: 80,
        unlockedItems: []
      },
      progress: {
        alphabets: {},
        words: 1,
        sentences: 1
      }
    };
    setKids(prev => [...prev, newKid]);
    if (!currentKidId) setCurrentKidId(newKid.id);
  };

  const selectKid = (id: string) => setCurrentKidId(id);

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
    <KidContext.Provider value={{ kids, currentKid, addKid, selectKid, addStars, unlockSticker, updatePet }}>
      {children}
    </KidContext.Provider>
  );
};

export const useKidContext = () => {
  const context = useContext(KidContext);
  if (!context) throw new Error('useKidContext must be used within a KidProvider');
  return context;
};
