import React, { createContext, useContext, useState, useEffect } from 'react';
import type { KidProfile, Gender, PetState, ParentProfile, ParentAccount } from '../types';

interface KidContextType {
  kids: KidProfile[];
  currentKid: KidProfile | null;
  parent: ParentProfile | null;
  addKid: (name: string, age: number, gender: Gender) => void;
  selectKid: (id: string | null) => void;
  addStars: (amount: number) => void;
  unlockSticker: (id: string) => void;
  updatePet: (update: Partial<PetState>) => void;
  loginParent: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerParent: (fullName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutParent: () => void;
}

const KidContext = createContext<KidContextType | undefined>(undefined);

export const KidProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parent, setParent] = useState<ParentProfile | null>(() => {
    const saved = localStorage.getItem('kid_learn_parent');
    return saved ? JSON.parse(saved) : null;
  });

  const [accounts, setAccounts] = useState<ParentAccount[]>(() => {
    const saved = localStorage.getItem('kid_learn_accounts');
    return saved ? JSON.parse(saved) : [];
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
    localStorage.setItem('kid_learn_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (parent) localStorage.setItem('kid_learn_parent', JSON.stringify(parent));
    else localStorage.removeItem('kid_learn_parent');
  }, [parent]);

  useEffect(() => {
    if (currentKidId) localStorage.setItem('kid_learn_active_id', currentKidId);
    else localStorage.removeItem('kid_learn_active_id');
  }, [currentKidId]);

  const loginParent = async (email: string, password: string) => {
    const account = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    
    if (!account) {
      return { success: false, error: 'Account not found. Please register first.' };
    }

    if (account.passwordHash !== btoa(password)) { // Dummy hash for local security
      return { success: false, error: 'Incorrect password.' };
    }

    const newParent: ParentProfile = { 
      id: Date.now().toString(), 
      email: account.email,
      fullName: account.fullName
    };
    setParent(newParent);
    return { success: true };
  };

  const registerParent = async (fullName: string, email: string, password: string) => {
    if (accounts.some(a => a.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered.' };
    }

    const newAccount: ParentAccount = {
      fullName,
      email,
      passwordHash: btoa(password) // Dummy hash
    };

    setAccounts(prev => [...prev, newAccount]);
    
    const newParent: ParentProfile = { 
      id: Date.now().toString(), 
      email: newAccount.email,
      fullName: newAccount.fullName
    };
    setParent(newParent);
    return { success: true };
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
    <KidContext.Provider value={{ kids, currentKid, parent, addKid, selectKid, addStars, unlockSticker, updatePet, loginParent, registerParent, logoutParent }}>
      {children}
    </KidContext.Provider>
  );
};

export const useKidContext = () => {
  const context = useContext(KidContext);
  if (!context) throw new Error('useKidContext must be used within a KidProvider');
  return context;
};
