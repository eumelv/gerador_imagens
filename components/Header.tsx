
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-4 text-center border-b border-gray-700/50">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Gerador de Imagem IA
        </span>
      </h1>
      <p className="text-gray-400 mt-1">Transforme texto em arte visual com Gemini</p>
    </header>
  );
};
