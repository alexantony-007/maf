export interface Story {
  title: string;
  lines: string[];
  level: number;
}

export const storiesData: Story[] = [
  {
    title: "The Happy Cat",
    level: 1,
    lines: [
      "The cat is small.",
      "The cat is happy.",
      "It plays with a ball."
    ]
  },
  {
    title: "The Red Ball",
    level: 5,
    lines: [
      "Ravi has a red ball.",
      "He throws it high.",
      "The ball comes down.",
      "Ravi laughs and plays again."
    ]
  },
  {
    title: "The Little Bird",
    level: 10,
    lines: [
      "A little bird sat on a tree.",
      "It looked at the sky.",
      "It wanted to fly high.",
      "Soon, it flapped its wings and flew."
    ]
  },
  {
    title: "The Lost Puppy",
    level: 20,
    lines: [
      "A small puppy was lost in the park.",
      "It looked around and felt scared.",
      "A kind boy saw the puppy and helped it.",
      "They found the puppy’s home together."
    ]
  },
  {
    title: "The Brave Elephant",
    level: 40,
    lines: [
      "An elephant lived near a big forest river.",
      "One day, the river started to rise after heavy rain.",
      "The smaller animals were afraid and did not know what to do.",
      "The elephant used its strength to guide them safely across the water.",
      "Because of its bravery, all the animals were saved.",
      "They thanked the elephant and celebrated together."
    ]
  }
];
