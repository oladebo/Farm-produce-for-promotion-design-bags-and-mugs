
import React, { useState, useCallback } from 'react';
import type { Design } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface UploadDesignProps {
  onDesignCreated: (design: Design) => void;
  setError: (error: string | null) => void;
}

// Helper to convert data URL to a Design object
const dataUrlToDesign = (dataUrl: string): Design | null => {
  const parts = dataUrl.split(',');
  if (parts.length !== 2) return null;

  const metaPart = parts[0];
  const base64 = parts[1];
  
  const mimeMatch = metaPart.match(/:(.*?);/);
  if (!mimeMatch || mimeMatch.length < 2) return null;

  const mimeType = mimeMatch[1];

  return { base64, mimeType };
};


export const UploadDesign: React.FC<UploadDesignProps> = ({ onDesignCreated, setError }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file (PNG, JPG, etc.).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      const design = dataUrlToDesign(result);
      if (design) {
        onDesignCreated(design);
        setError(null);
      } else {
        setError("Could not process the uploaded file.");
      }
    };
    reader.onerror = () => {
        setError("Failed to read the file.");
    };
    reader.readAsDataURL(file);
  }, [onDesignCreated, setError]);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="flex flex-col items-center justify-center w-full">
        {preview ? (
          <div className="text-center">
            <img src={preview} alt="Logo preview" className="max-h-40 rounded-lg shadow-md mx-auto" />
            <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">Logo uploaded successfully!</p>
          </div>
        ) : (
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div> 
    </div>
  );
};
