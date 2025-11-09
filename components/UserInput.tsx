
import React, { useState } from 'react';

interface UserInputProps {
  onSubmit: (text: string) => void;
  disabled: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onSubmit, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700">
      <div className="flex items-center space-x-4 max-w-4xl mx-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={disabled ? "Espera la respuesta..." : "Escribe tu respuesta aquí..."}
          disabled={disabled}
          className="flex-grow bg-gray-700 border border-gray-600 rounded-full py-3 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled || !inputValue.trim()}
          className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default UserInput;
