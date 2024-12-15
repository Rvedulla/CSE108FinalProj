import React from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: {
    [key: string]: 'correct' | 'present' | 'absent' | undefined;
  };
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, usedLetters }) => {
  const getKeyClass = (key: string) => {
    const status = usedLetters[key];
    const baseClass = 'p-2 m-1 rounded font-bold transition-colors';
    
    switch (status) {
      case 'correct':
        return `${baseClass} bg-green-500 text-white`;
      case 'present':
        return `${baseClass} bg-yellow-500 text-white`;
      case 'absent':
        return `${baseClass} bg-gray-500 text-white`;
      default:
        return `${baseClass} bg-gray-200 hover:bg-gray-300`;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyClass(key)}
              style={{ minWidth: key.length > 1 ? '4.5rem' : '2.5rem' }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};