
import React from 'react';
import { LoaderIcon } from './icons/LoaderIcon';
import { PhotoIcon } from './icons/PhotoIcon';
import { PencilIcon } from './icons/PencilIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
  onEdit: () => void;
  onDownload: () => void;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, prompt, onEdit, onDownload }) => {
  
  const Placeholder = () => (
    <div className="w-full aspect-square bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center p-4 transition-all duration-300">
      <div className="flex flex-col items-center justify-center text-center text-gray-500">
        <PhotoIcon className="w-20 h-20 mb-4" />
        <h3 className="text-lg font-semibold text-gray-400">Sua imagem aparecerá aqui</h3>
        <p className="max-w-xs">Descreva uma imagem, clique em "Gerar" e veja a mágica acontecer.</p>
      </div>
    </div>
  );

  const LoadingState = () => (
    <div className="w-full aspect-square bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center p-4 transition-all duration-300">
     <div className="flex flex-col items-center justify-center text-center text-gray-400">
        <LoaderIcon className="w-16 h-16 animate-spin text-blue-500 mb-4" />
        <h3 className="text-lg font-semibold">Criando sua obra-prima...</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-sm truncate">"{prompt}"</p>
     </div>
    </div>
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (!imageUrl) {
    return <Placeholder />;
  }

  return (
    <div className="w-full">
      <div className="w-full aspect-square bg-gray-800/50 border-2 border-gray-700/50 rounded-xl flex items-center justify-center p-2 transition-all duration-300 shadow-lg">
        <img 
          src={imageUrl} 
          alt={prompt} 
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">"{prompt}"</p>
        <div className="flex items-center gap-3">
          <button 
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
          >
            <PencilIcon className="w-4 h-4" />
            Personalizar
          </button>
          <button 
            onClick={onDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
          >
            <DownloadIcon className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
