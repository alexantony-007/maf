export interface JumbleWord {
  answer: string;
  hint: string;
  category: string;
}

export const wordsLevels: { [level: number]: JumbleWord[] } = {
  1: [
    { answer: 'CAT', hint: 'Meow!', category: 'Animals' },
    { answer: 'DOG', hint: 'Woof!', category: 'Animals' },
    { answer: 'SUN', hint: 'Big and bright', category: 'Nature' },
    { answer: 'PEN', hint: 'Write with this', category: 'School' },
    { answer: 'BAT', hint: 'Hit a ball', category: 'Sports' },
    { answer: 'HAT', hint: 'Wear on head', category: 'Clothes' },
    { answer: 'CUP', hint: 'Drink from this', category: 'Kitchen' },
    { answer: 'BED', hint: 'Sleep here', category: 'Home' },
    { answer: 'CAR', hint: 'Drive this', category: 'Transport' },
    { answer: 'BOX', hint: 'Put things inside', category: 'Objects' }
  ],
  2: [
    { answer: 'MAP', hint: 'Find your way', category: 'Objects' },
    { answer: 'RUN', hint: 'Move fast', category: 'Actions' },
    { answer: 'RED', hint: 'A bright color', category: 'Colors' },
    { answer: 'BIG', hint: 'Not small', category: 'Sizes' },
    { answer: 'TOY', hint: 'Play with this', category: 'Fun' },
    { answer: 'LEG', hint: 'Part of body', category: 'Body' },
    { answer: 'SKY', hint: 'High above', category: 'Nature' },
    { answer: 'PIE', hint: 'Sweet treat', category: 'Food' },
    { answer: 'BEE', hint: 'Makes honey', category: 'Animals' },
    { answer: 'ICE', hint: 'Cold water', category: 'Nature' }
  ],
  10: [
    { answer: 'FROG', hint: 'Jumps and croaks', category: 'Animals' },
    { answer: 'TREE', hint: 'Has leaves', category: 'Nature' },
    { answer: 'MILK', hint: 'White drink', category: 'Food' },
    { answer: 'STAR', hint: 'Twinkles at night', category: 'Nature' },
    { answer: 'BLUE', hint: 'Color of sea', category: 'Colors' },
    { answer: 'HAND', hint: 'Five fingers', category: 'Body' },
    { answer: 'BOOK', hint: 'Read this', category: 'School' },
    { answer: 'RAIN', hint: 'Water from sky', category: 'Nature' },
    { answer: 'FISH', hint: 'Swims in water', category: 'Animals' },
    { answer: 'CAKE', hint: 'Birthday treat', category: 'Food' }
  ],
  25: [
    { answer: 'CHAIR', hint: 'Sit on this', category: 'Home' },
    { answer: 'PLANT', hint: 'Grows in soil', category: 'Nature' },
    { answer: 'BREAD', hint: 'Eat with butter', category: 'Food' },
    { answer: 'STONE', hint: 'Hard and grey', category: 'Nature' },
    { answer: 'WATER', hint: 'Drink this', category: 'Nature' },
    { answer: 'LIGHT', hint: 'Opposite of dark', category: 'Science' },
    { answer: 'SMILE', hint: 'Happy face', category: 'Actions' },
    { answer: 'TRAIN', hint: 'Runs on tracks', category: 'Transport' },
    { answer: 'GREEN', hint: 'Color of grass', category: 'Colors' },
    { answer: 'CLOCK', hint: 'Tells time', category: 'Objects' }
  ]
};
