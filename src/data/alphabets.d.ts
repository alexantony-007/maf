// Type declaration for alphabets.ts which is excluded from TS compilation
// due to multi-script Unicode content causing encoding detection issues.
// This file ensures the rest of the codebase has correct types.

export interface Alphabet {
  char: string;
  word: string;
  phonetic: string;
  image?: string;
}

export declare const alphabetsData: { [key: string]: Alphabet[] };
