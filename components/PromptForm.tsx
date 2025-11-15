import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoaderIcon } from './icons/LoaderIcon';
import { UploadIcon } from './icons/UploadIcon';
import { XIcon } from './icons/XIcon';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  uploadedImage: { previewUrl: string } | null;
}

export const PromptForm: React.FC<PromptFormProps> = ({ 
  prompt, 
  setPrompt, 
  onSubmit, 
  isLoading,
  onImageUpload,
  onRemoveImage,
  uploadedImage
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const buttonText = uploadedImage ? "Personalizar Imagem" : "Gerar Imagem";
  const placeholderText = uploadedImage 
    ? "Ex: Adicione um chapéu de pirata no cachorro..."
    : "Ex: Um astronauta andando a cavalo em marte...";

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {!uploadedImage ? (
        <label className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
          <UploadIcon className="w-5 h-5" />
          Carregar Imagem (Opcional)
          <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={onImageUpload} disabled={isLoading} />
        </label>
      ) : (
        <div className="relative w-full p-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center gap-3">
          <img src={uploadedImage.previewUrl} alt="Preview" className="w-16 h-16 rounded-md object-cover" />
          <span className="text-gray-300 text-sm flex-grow truncate">Imagem carregada.</span>
          <button 
            type="button" 
            onClick={onRemoveImage}
            className="p-1.5 text-gray-400 bg-gray-700 rounded-full hover:bg-gray-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
            aria-label="Remover imagem"
            disabled={isLoading}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="relative w-full">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          className="w-full h-40 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-200 placeholder-gray-500"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="animate-spin h-5 w-5" />
            Processando...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5" />
            {buttonText}
          </>
        )}
      </button>
    </form>
  );
};