import React, { useCallback } from 'react';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './hooks/useAuth';
import { useGame } from './hooks/useGame';
import { Toaster } from 'react-hot-toast';
import { Gamepad2 as GameController } from 'lucide-react';

function App() {
  const { gameState, usedLetters, handleKeyPress, resetGame } = useGame();
  
  // Create a memoized reset handler
  const handleReset = useCallback(() => {
    resetGame();
  }, [resetGame]);

  // Pass the reset handler to useAuth
  const { isAuthenticated, handleAuth, logout } = useAuth(handleReset);

  if (!isAuthenticated) {
    return <AuthForm onSubmit={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <GameController className="w-8 h-8 mr-2" />
              Wordle Clone
            </h1>
            <div className="space-x-4">
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                New Game
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <Grid
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            targetWord={gameState.targetWord}
          />
          <Keyboard
            onKeyPress={handleKeyPress}
            usedLetters={usedLetters}
          />
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;