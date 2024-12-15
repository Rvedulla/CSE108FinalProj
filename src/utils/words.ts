export const WORDS = [
  'REACT', 'VITE', 'GAME', 'CODE', 'WORD',
  'TYPE', 'NODE', 'PLAY', 'WORK', 'TIME',
  'LIFE', 'BOOK', 'READ', 'WRITE', 'LEARN',
  'BUILD', 'STYLE', 'CLASS', 'STATE', 'PROPS'
];

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};