export interface JumbleWord {
  answer: string;
  hint: string;
  category: string;
}

export const wordsLevels: { [level: number]: JumbleWord[] } = {
  1: [
    { answer: 'CAT', hint: 'Meow!', category: 'Animals' },
    { answer: 'DOG', hint: 'Woof!', category: 'Animals' },
    { answer: 'RED', hint: 'Color of an apple', category: 'Colors' },
    { answer: 'SUN', hint: 'Big and bright in the sky', category: 'Nature' },
    { answer: 'BOY', hint: 'A young male', category: 'People' },
    { answer: 'BAT', hint: 'Used to hit a ball', category: 'Sports' },
    { answer: 'HAT', hint: 'Worn on the head', category: 'Clothes' },
    { answer: 'PEN', hint: 'Used for writing', category: 'School' },
    { answer: 'CUP', hint: 'Used for drinking', category: 'Kitchen' },
    { answer: 'CAR', hint: 'Four wheels and a motor', category: 'Transport' }
  ],
  2: [
    { answer: 'BIRD', hint: 'Can fly in the sky', category: 'Animals' },
    { answer: 'FISH', hint: 'Swims in water', category: 'Animals' },
    { answer: 'BLUE', hint: 'Color of the sky', category: 'Colors' },
    { answer: 'TREE', hint: 'Has leaves and branches', category: 'Nature' },
    { answer: 'GIRL', hint: 'A young female', category: 'People' },
    { answer: 'BALL', hint: 'Round and used for play', category: 'Sports' },
    { answer: 'SHOE', hint: 'Worn on feet', category: 'Clothes' },
    { answer: 'BOOK', hint: 'You read this', category: 'School' },
    { answer: 'FORK', hint: 'Used for eating', category: 'Kitchen' },
    { answer: 'BIKE', hint: 'Two wheels and pedals', category: 'Transport' }
  ],
  // Add more levels here...
  10: [
    { answer: 'ELEPHANT', hint: 'Largest land animal', category: 'Animals' },
    { answer: 'DINOSAUR', hint: 'Extinct reptile', category: 'Animals' },
    { answer: 'RAINBOW', hint: 'Seven colors in the sky', category: 'Nature' },
    { answer: 'MOUNTAIN', hint: 'Very high land', category: 'Nature' },
    { answer: 'COMPUTER', hint: 'Electronic machine', category: 'Tech' },
    { answer: 'AIRPLANE', hint: 'Flies people through air', category: 'Transport' },
    { answer: 'UMBRELLA', hint: 'Protects from rain', category: 'Objects' },
    { answer: 'NOTEBOOK', hint: 'Where you write notes', category: 'School' },
    { answer: 'SANDWICH', hint: 'Two slices of bread with filling', category: 'Food' },
    { answer: 'PUMPKIN', hint: 'Large orange vegetable', category: 'Food' }
  ]
};
