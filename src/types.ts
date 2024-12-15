export interface User {
  id: number;
  username: string;
  password: string;
}

export interface GameState {
  guesses: string[];
  currentGuess: string;
  gameStatus: 'playing' | 'won' | 'lost';
  targetWord: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}