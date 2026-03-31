export interface Alphabet {
  char: string;
  phonetic: string;
}

export const alphabetsData: { [lang: string]: Alphabet[] } = {
  english: [
    { char: 'A', phonetic: 'ay' }, { char: 'B', phonetic: 'bee' }, { char: 'C', phonetic: 'see' },
    { char: 'D', phonetic: 'dee' }, { char: 'E', phonetic: 'ee' }, { char: 'F', phonetic: 'ef' },
    { char: 'G', phonetic: 'jee' }, { char: 'H', phonetic: 'aitch' }, { char: 'I', phonetic: 'eye' },
    { char: 'J', phonetic: 'jay' }, { char: 'K', phonetic: 'kay' }, { char: 'L', phonetic: 'el' },
    { char: 'M', phonetic: 'em' }, { char: 'N', phonetic: 'en' }, { char: 'O', phonetic: 'oh' },
    { char: 'P', phonetic: 'pee' }, { char: 'Q', phonetic: 'cue' }, { char: 'R', phonetic: 'ar' },
    { char: 'S', phonetic: 'ess' }, { char: 'T', phonetic: 'tee' }, { char: 'U', phonetic: 'you' },
    { char: 'V', phonetic: 'vee' }, { char: 'W', phonetic: 'double-u' }, { char: 'X', phonetic: 'ex' },
    { char: 'Y', phonetic: 'why' }, { char: 'Z', phonetic: 'zee' }
  ],
  hindi: [
    { char: 'अ', phonetic: 'a' }, { char: 'आ', phonetic: 'aa' }, { char: 'इ', phonetic: 'i' },
    { char: 'ई', phonetic: 'ee' }, { char: 'उ', phonetic: 'u' }, { char: 'ऊ', phonetic: 'oo' },
    { char: 'ऋ', phonetic: 'ri' }, { char: 'ए', phonetic: 'e' }, { char: 'ऐ', phonetic: 'ai' },
    { char: 'ओ', phonetic: 'o' }, { char: 'औ', phonetic: 'au' }, { char: 'अं', phonetic: 'ang' },
    { char: 'अः', phonetic: 'ah' }
  ],
  malayalam: [
    { char: 'അ', phonetic: 'a' }, { char: 'ആ', phonetic: 'aa' }, { char: 'ഇ', phonetic: 'i' },
    { char: 'ഈ', phonetic: 'ee' }, { char: 'ഉ', phonetic: 'u' }, { char: 'ഊ', phonetic: 'oo' },
    { char: 'ഋ', phonetic: 'ru' }, { char: 'എ', phonetic: 'e' }, { char: 'ഏ', phonetic: 'ee' },
    { char: 'ഐ', phonetic: 'ai' }, { char: 'ഒ', phonetic: 'o' }, { char: 'ഓ', phonetic: 'oo' },
    { char: 'ഔ', phonetic: 'au' }, { char: 'അം', phonetic: 'am' }, { char: 'അഃ', phonetic: 'ah' }
  ]
};
