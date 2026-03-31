export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  gender: 'boy' | 'girl' | 'both';
  cost: number;
}

export const stickersData: Sticker[] = [
  // Girls' Unicorns (simplified emojis for now)
  { id: 'g1', name: 'Sparkle Unicorn', emoji: '🦄', gender: 'girl', cost: 100 },
  { id: 'g2', name: 'Rainbow Pony', emoji: '🌈', gender: 'girl', cost: 200 },
  { id: 'g3', name: 'Pink Fairy', emoji: '🧚‍♀️', gender: 'girl', cost: 300 },
  { id: 'g4', name: 'Glitter Heart', emoji: '💖', gender: 'girl', cost: 400 },
  { id: 'g5', name: 'Crystal Swan', emoji: '🦢', gender: 'girl', cost: 500 },
  // Boys' Cars
  { id: 'b1', name: 'Fast Racer', emoji: '🏎️', gender: 'boy', cost: 100 },
  { id: 'b2', name: 'Police Car', emoji: '🚓', gender: 'boy', cost: 200 },
  { id: 'b3', name: 'Monster Truck', emoji: '🛻', gender: 'boy', cost: 300 },
  { id: 'b4', name: 'Fire Engine', emoji: '🚒', gender: 'boy', cost: 400 },
  { id: 'b5', name: 'Rocket Ship', emoji: '🚀', gender: 'boy', cost: 500 },
  // And so on up to 50 each...
];
