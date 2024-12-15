import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AuthService } from '../services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleAuth = async (username: string, password: string, isLogin: boolean) => {
    try {
      const data = await AuthService.authenticate(username, password, isLogin);
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      toast.success(`Welcome ${username}!`);
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    handleAuth,
    logout,
  };
};