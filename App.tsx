
import React, { useState } from 'react';
import { DesignSourceStep } from './components/DesignSourceStep';
import { ProductSelectStep } from './components/ProductSelectStep';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { ArrowPathIcon } from './components/icons/ArrowPathIcon';
import type { Design } from './types';

export default function App() {
  const [design, setDesign] = useState<Design | null>(null);
  const [mockupImages, setMockupImages] = useState<{ mug: string; bag: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetApp = () => {
    setDesign(null);
    setMockupImages(null);
    setIsLoading(false);
    setError(null);
  };

  const handleDesignCreated = (newDesign: Design | null) => {
    setDesign(newDesign);
    setError(null);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-10 space-y-8">
            {mockupImages ? (
              <ResultDisplay mockupImages={mockupImages} onReset={resetApp} />
            ) : (
              <>
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Create Your Product Mockup</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Follow the steps below to bring your design to life.</p>
                </div>
                
                <div className="relative">
                  {/* Step Connector */}
                  <div className="absolute left-1/2 top-5 bottom-5 w-0.5 bg-gray-200 dark:bg-gray-600 hidden md:block" aria-hidden="true"></div>

                  <div className="space-y-8 md:space-y-12">
                    <DesignSourceStep 
                      onDesignCreated={handleDesignCreated} 
                      isLoading={isLoading} 
                      setIsLoading={setIsLoading}
                      setError={setError}
                      currentDesign={design}
                    />
                    
                    {design && (
                      <ProductSelectStep 
                        design={design} 
                        setMockupImages={setMockupImages} 
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        setError={setError}
                      />
                    )}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative text-center" role="alert">
                    <strong className="font-bold">An error occurred: </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
              </>
            )}
          </div>
          {(design || mockupImages) && !mockupImages && (
             <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  onClick={resetApp}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  Start Over
                </button>
             </div>
          )}
        </div>
         <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
            <p>Powered by Gemini AI</p>
        </footer>
      </main>
    </div>
  );
}
