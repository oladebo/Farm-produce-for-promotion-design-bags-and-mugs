
import React, { useState } from 'react';
import { generateDesign } from '../services/geminiService';
import type { Design, AspectRatio } from '../types';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface GenerateDesignProps {
  onDesignCreated: (design: Design) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  currentDesign: Design | null;
}

const aspectRatios: AspectRatio[] = ['1:1', '16:9', '9:16'];

export const GenerateDesign: React.FC<GenerateDesignProps> = ({ onDesignCreated, isLoading, setIsLoading, setError, currentDesign }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a description for your design.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const design = await generateDesign(prompt, aspectRatio);
      onDesignCreated(design);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const getAspectRatioButtonClass = (ratio: AspectRatio) => {
    const base = "px-3 py-1.5 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500";
    if (ratio === aspectRatio) {
      return `${base} bg-indigo-600 text-white`;
    }
    return `${base} bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500`;
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Describe your design
        </label>
        <textarea
          id="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
          placeholder="e.g., a cute smiling robot, minimalist line art style"
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Aspect Ratio:</div>
        <div className="flex items-center gap-2">
          {aspectRatios.map(ratio => (
            <button key={ratio} onClick={() => setAspectRatio(ratio)} className={getAspectRatioButtonClass(ratio)} disabled={isLoading}>
              {ratio}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleGenerate}
        disabled={isLoading || !prompt}
        className="w-full flex justify-center items-center gap-2 px-4 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {isLoading ? <LoadingSpinner /> : 'Generate Design'}
      </button>

      {currentDesign && !isLoading && (
        <div className="mt-4 text-center">
            <p className="mb-2 text-sm font-medium text-green-600 dark:text-green-400">Design generated successfully!</p>
            <img
                src={`data:${currentDesign.mimeType};base64,${currentDesign.base64}`}
                alt="Generated design"
                className="max-h-40 rounded-lg shadow-md mx-auto bg-white"
            />
        </div>
      )}
    </div>
  );
};
