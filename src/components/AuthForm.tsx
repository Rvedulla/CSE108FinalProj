import React, { useState } from 'react';
import { LogIn, UserPlus, Sun, Moon } from 'lucide-react';

interface AuthFormProps {
  onSubmit: (username: string, password: string, isLogin: boolean) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password, isLogin);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-500 to-indigo-700'
      } p-4 transition-colors duration-500`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white shadow-md transition-all duration-300"
        title="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Form Container */}
      <div
        className={`relative ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white'
        } p-8 rounded-lg shadow-lg w-full max-w-md transition-all duration-500`}
      >
        {/* Decorative Circles */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-400 rounded-full opacity-20"></div>

        {/* Header */}
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          {isLogin ? 'Welcome Back!' : 'Join Us'}
        </h2>
        <p className="text-sm mb-6 text-center">
          {isLogin ? 'Login to enjoy Bobcat Wordle' : 'Create an account to start playing'}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-5 transform ${
            isLogin ? 'translate-x-0 opacity-100' : 'translate-x-1 opacity-90'
          } transition-all duration-700`}
        >
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full rounded-md shadow-sm p-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 focus:border-blue-400 text-white'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-md shadow-sm p-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 focus:border-blue-400 text-white'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white rounded-md font-semibold shadow-md hover:opacity-90 transition-all duration-300 ${
              darkMode ? 'bg-blue-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}
          >
            {isLogin ? (
              <>
                <LogIn className="w-5 h-5 inline-block mr-2" />
                Login
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 inline-block mr-2" />
                Sign Up
              </>
            )}
          </button>
        </form>

        {/* Switch Mode Button */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 w-full text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 text-center transition-colors duration-300"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};