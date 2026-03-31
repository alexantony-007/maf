export interface Sentence {
  text: string;
  level: number;
}

export const sentencesData: Sentence[] = [
  { text: 'The cat is on the mat.', level: 1 },
  { text: 'I love my mummy and daddy.', level: 1 },
  { text: 'The sun is big and bright.', level: 1 },
  { text: 'A small bird is in the tree.', level: 1 },
  { text: 'I can see a red apple.', level: 1 },
  { text: 'The dog is running in the park.', level: 2 },
  { text: 'A big elephant has a long trunk.', level: 2 },
  { text: 'I drink milk every morning.', level: 2 },
  { text: 'The rainbow has seven colors.', level: 3 },
  { text: 'We play with a ball in the garden.', level: 3 }
];
