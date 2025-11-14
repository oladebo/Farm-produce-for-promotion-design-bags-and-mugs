
import React from 'react';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  mockupImages: {
    mug: string;
    bag: string;
  };
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ mockupImages, onReset }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center gap-3">
        <CheckCircleIcon className="h-12 w-12 text-green-500"/>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Mockups are Ready!</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Mug */}
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Mug Mockup</h3>
            <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-inner inline-block">
                <img
                src={`data:image/png;base64,${mockupImages.mug}`}
                alt="Generated mug mockup"
                className="max-w-full h-auto max-h-[45vh] rounded-md shadow-lg"
                />
            </div>
            <a
                href={`data:image/png;base64,${mockupImages.mug}`}
                download="mug-mockup.png"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-green-500"
                >
                <DownloadIcon className="h-5 w-5" />
                Download Mug
            </a>
        </div>
        {/* Tote Bag */}
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Tote Bag Mockup</h3>
            <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-inner inline-block">
                <img
                src={`data:image/png;base64,${mockupImages.bag}`}
                alt="Generated tote bag mockup"
                className="max-w-full h-auto max-h-[45vh] rounded-md shadow-lg"
                />
            </div>
            <a
                href={`data:image/png;base64,${mockupImages.bag}`}
                download="tote-bag-mockup.png"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-green-500"
                >
                <DownloadIcon className="h-5 w-5" />
                Download Bag
            </a>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          <ArrowPathIcon className="h-5 w-5"/>
          Create Another Mockup
        </button>
      </div>
    </div>
  );
};
