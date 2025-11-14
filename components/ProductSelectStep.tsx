
import React from 'react';
import { createMockup } from '../services/geminiService';
import type { Design } from '../types';
import { MugIcon } from './icons/MugIcon';
import { BagIcon } from './icons/BagIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface ProductSelectStepProps {
  design: Design;
  setMockupImages: (images: { mug: string; bag: string }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const ProductSelectStep: React.FC<ProductSelectStepProps> = ({ design, setMockupImages, isLoading, setIsLoading, setError }) => {

  const handleCreateMockups = async () => {
    setError(null);
    setIsLoading(true);
    try {
        const [mugMockup, bagMockup] = await Promise.all([
            createMockup(design, 'Mug'),
            createMockup(design, 'Tote Bag')
        ]);
        setMockupImages({ mug: mugMockup, bag: bagMockup });
    } catch (e: any) {
        setError(e.message || "An unknown error occurred during mockup creation.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 bg-indigo-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">2</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Generate Mockups</h3>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Your design will be placed on the following products:</p>
        <div className="flex justify-center items-center gap-8 sm:gap-16">
            <div className="flex flex-col items-center gap-2 text-gray-800 dark:text-gray-200">
                <MugIcon className="h-12 w-12" />
                <span className="font-medium">Mug</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-gray-800 dark:text-gray-200">
                <BagIcon className="h-12 w-12" />
                <span className="font-medium">Tote Bag</span>
            </div>
        </div>
      </div>

      <button
        onClick={handleCreateMockups}
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 px-4 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-green-500 disabled:bg-green-400 disabled:cursor-not-allowed"
      >
        {isLoading ? <LoadingSpinner /> : 'Create Mockups'}
      </button>
    </div>
  );
};
