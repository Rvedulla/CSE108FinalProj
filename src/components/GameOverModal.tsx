import React from 'react';
import { X } from 'lucide-react';

interface GameOverModalProps {
  targetWord: string;
  onNewGame: () => void;
  onLogout: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ targetWord, onNewGame, onLogout }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Game Over!</h2>
        </div>
        
        <p className="text-lg mb-4">
          The word was <span className="font-bold text-indigo-600">{targetWord}</span>
        </p>
        
        <p className="text-gray-600 mb-6">Would you like to try again or logout?</p>
        
        <div className="flex space-x-4">
          <button
            onClick={onNewGame}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            New Game
          </button>
          <button
            onClick={onLogout}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};