
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <SparklesIcon className="h-8 w-8 text-indigo-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Mockup Magic AI
        </h1>
      </div>
    </header>
  );
};
