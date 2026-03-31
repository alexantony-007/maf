export type Gender = 'boy' | 'girl';

export interface PetState {
  type: 'cat' | 'dog' | 'rabbit' | 'elephant' | 'panda';
  happiness: number; // 0-100
  hunger: number;    // 0-100
  cleanliness: number; // 0-100
  unlockedItems: string[];
}

export interface KidProfile {
  id: string;
  name: string;
  gender: Gender;
  stars: number;
  unlockedStickers: string[];
  pet: PetState;
  progress: {
    alphabets: { [lang: string]: string[] }; // List of completed letters
    words: number; // Level reached
    sentences: number;
  };
}
