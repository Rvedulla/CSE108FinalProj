import { useState } from 'react';
import { GameState } from '../types';
import { getRandomWord } from '../utils/words';
import { toast } from 'react-hot-toast';

const resetGame = (
  setGameState?: React.Dispatch<React.SetStateAction<GameState>>,
  setUsedLetters?: React.Dispatch<React.SetStateAction<{ [key: string]: 'correct' | 'present' | 'absent' | undefined }>>
) => {
  if (setGameState) {
    setGameState({
      guesses: [],
      currentGuess: '',
      gameStatus: 'playing',
      targetWord: getRandomWord(),
    });
  }
  if (setUsedLetters) {
    setUsedLetters({});
  }
};

export { resetGame };

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    targetWord: getRandomWord(),
  });

  const [usedLetters, setUsedLetters] = useState<{
    [key: string]: 'correct' | 'present' | 'absent' | undefined;
  }>({});

  const handleKeyPress = (key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === '⌫') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
    } else if (key === 'ENTER' && gameState.currentGuess.length === 5) {
      submitGuess();
    } else if (key !== 'ENTER' && gameState.currentGuess.length < 5) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + key,
      }));
    }
  };

  const submitGuess = () => {
    const newGuesses = [...gameState.guesses, gameState.currentGuess];
    const won = gameState.currentGuess === gameState.targetWord;
    const lost = newGuesses.length === 6;

    updateUsedLetters();
    updateGameState(newGuesses, won, lost);
    showGameResult(won, lost, newGuesses.length);
  };

  const updateUsedLetters = () => {
    const newUsedLetters = { ...usedLetters };
    gameState.currentGuess.split('').forEach((letter, index) => {
      if (letter === gameState.targetWord[index]) {
        newUsedLetters[letter] = 'correct';
      } else if (gameState.targetWord.includes(letter)) {
        if (newUsedLetters[letter] !== 'correct') {
          newUsedLetters[letter] = 'present';
        }
      } else {
        if (!newUsedLetters[letter]) {
          newUsedLetters[letter] = 'absent';
        }
      }
    });
    setUsedLetters(newUsedLetters);
  };

  const updateGameState = (newGuesses: string[], won: boolean, lost: boolean) => {
    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      currentGuess: '',
      gameStatus: won ? 'won' : lost ? 'lost' : 'playing',
    }));
  };

  const showGameResult = (won: boolean, lost: boolean, attempts: number) => {
    if (won) {
      toast.success(`Congratulations! You won in ${attempts} attempts! 🎉`);
    } else if (lost) {
      toast.error(`Game Over! The word was ${gameState.targetWord}`);
    }
  };

  return {
    gameState,
    usedLetters,
    handleKeyPress,
    resetGame: () => resetGame(setGameState, setUsedLetters),
  };
};