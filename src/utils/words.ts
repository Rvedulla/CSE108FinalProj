export const WORDS = [
  'PLANE', 'CROWN', 'BRAVE', 'SHIFT', 'GLORY',
  'CHART', 'FROST', 'MIGHT', 'CLAMP', 'GRIND',
  'SPEAR', 'VOUCH', 'BLEND', 'CRISP', 'FLARE',
  'PRIME', 'SHOCK', 'TRAIL', 'BLAST', 'CHILD',
  'FRANK', 'GUARD', 'PAINT', 'STORM', 'BEACH',
  'WRONG', 'TRUCE', 'SPEND', 'CLASH', 'GRACE'
];


export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};