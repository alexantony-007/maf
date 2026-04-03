export type Gender = 'boy' | 'girl';

export interface PetState {
  name: string;
  type: 'cat' | 'dog' | 'rabbit' | 'elephant' | 'panda';
  happiness: number; // 0-100
  hunger: number;    // 0-100
  cleanliness: number; // 0-100
  energy: number;   // 0-100
  unlockedItems: string[];
}

export interface KidProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  stars: number;
  unlockedStickers: string[];
  pet: PetState;
  progress: {
    alphabets: { [lang: string]: string[] }; // List of completed letters
    wordsLevel: number; 
    storiesLevel: number;
    numbersLevel: number;
  };
}

export interface ParentAccount {
  email: string;
  passwordHash: string; // Simulated hash for local storage
  fullName: string;
}

export interface ParentProfile {
  id: string;
  email: string;
  fullName: string;
}
