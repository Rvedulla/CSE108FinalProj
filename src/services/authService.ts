import { AuthResponse } from '../types';

export class AuthService {
  static async authenticate(username: string, password: string, isLogin: boolean): Promise<AuthResponse> {
    const response = await fetch(`/api/${isLogin ? 'login' : 'register'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    
    return response.json();
  }
}