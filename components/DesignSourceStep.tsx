
import React, { useState } from 'react';
import { UploadDesign } from './UploadDesign';
import { GenerateDesign } from './GenerateDesign';
import type { Design } from '../types';
import { PhotoIcon } from './icons/PhotoIcon';
import { WandIcon } from './icons/WandIcon';

interface DesignSourceStepProps {
  onDesignCreated: (design: Design) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  currentDesign: Design | null;
}

type DesignMode = 'upload' | 'generate';

export const DesignSourceStep: React.FC<DesignSourceStepProps> = ({ onDesignCreated, isLoading, setIsLoading, setError, currentDesign }) => {
  const [mode, setMode] = useState<DesignMode | null>(null);

  const handleSelectMode = (selectedMode: DesignMode) => {
    setMode(selectedMode);
    onDesignCreated(null); // Clear previous design when switching modes
  };

  const getButtonClasses = (buttonMode: DesignMode) => {
    const baseClasses = "flex-1 p-4 md:p-6 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500";
    const activeClasses = "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500";
    const inactiveClasses = "bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-gray-700";
    return `${baseClasses} ${mode === buttonMode ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 bg-indigo-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">1</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Provide Your Design</h3>
      </div>
      
      {!currentDesign && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => handleSelectMode('upload')} className={getButtonClasses('upload')}>
            <div className="flex items-center justify-center md:justify-start">
              <PhotoIcon className="h-8 w-8 mr-4 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 text-center md:text-left">Upload Logo</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">Use your own image file.</p>
              </div>
            </div>
          </button>
          <button onClick={() => handleSelectMode('generate')} className={getButtonClasses('generate')}>
             <div className="flex items-center justify-center md:justify-start">
              <WandIcon className="h-8 w-8 mr-4 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 text-center md:text-left">Generate with AI</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">Create a new design from text.</p>
              </div>
            </div>
          </button>
        </div>
      )}

      {mode === 'upload' && <UploadDesign onDesignCreated={onDesignCreated} setError={setError} />}
      {mode === 'generate' && (
        <GenerateDesign 
          onDesignCreated={onDesignCreated} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          setError={setError}
          currentDesign={currentDesign}
        />
      )}
    </div>
  );
};
