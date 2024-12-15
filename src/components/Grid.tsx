import React from 'react';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
}

export const Grid: React.FC<GridProps> = ({ guesses, currentGuess, targetWord }) => {
  const empties = Array(6 - (guesses.length + 1)).fill('');
  const currentGuessArray = currentGuess.split('').concat(Array(5 - currentGuess.length).fill(''));

  const getLetterClass = (letter: string, index: number, word: string) => {
    const base = 'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded m-1';
    
    if (!letter) return `${base} border-gray-300`;
    
    if (word === guesses[guesses.length - 1]) {
      if (letter === targetWord[index]) {
        return `${base} bg-green-500 text-white border-green-500`;
      }
      if (targetWord.includes(letter)) {
        return `${base} bg-yellow-500 text-white border-yellow-500`;
      }
      return `${base} bg-gray-500 text-white border-gray-500`;
    }

    return `${base} border-gray-300`;
  };

  return (
    <div className="grid grid-rows-6 gap-1 p-4">
      {guesses.map((guess, i) => (
        <div key={i} className="flex justify-center">
          {guess.split('').map((letter, j) => (
            <div key={j} className={getLetterClass(letter, j, guess)}>
              {letter}
            </div>
          ))}
        </div>
      ))}
      {guesses.length < 6 && (
        <div className="flex justify-center">
          {currentGuessArray.map((letter, i) => (
            <div key={i} className={getLetterClass(letter, i, '')}>
              {letter}
            </div>
          ))}
        </div>
      )}
      {empties.map((_, i) => (
        <div key={i} className="flex justify-center">
          {Array(5).fill('').map((_, j) => (
            <div key={j} className="w-14 h-14 border-2 border-gray-300 rounded m-1" />
          ))}
        </div>
      ))}
    </div>
  );
};