import React, { useState, useCallback } from 'react';
import { generateImageFromPrompt, editImageWithPrompt } from './services/geminiService';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Footer } from './components/Footer';

interface UploadedImage {
  data: string; // base64 data
  mimeType: string;
  previewUrl: string; // data URL for <img> src
}

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("O arquivo de imagem é muito grande. O tamanho máximo é de 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        setUploadedImage({
            data: base64Data,
            mimeType: file.type,
            previewUrl: result
        });
        setError(null); // Clear previous errors
      };
      reader.onerror = () => {
        setError("Falha ao ler o arquivo de imagem.");
      }
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null);
  }, []);


  const handleGenerateImage = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    setLastPrompt(prompt);

    try {
      let generatedImageUrl;
      if (uploadedImage) {
        generatedImageUrl = await editImageWithPrompt(prompt, uploadedImage);
      } else {
        generatedImageUrl = await generateImageFromPrompt(prompt);
      }
      setImageUrl(generatedImageUrl);
    } catch (err) {
      console.error(err);
      setError('Falha ao processar a imagem. Verifique sua chave de API, o prompt e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, uploadedImage]);

  const handleEditPrompt = useCallback(() => {
    setPrompt(lastPrompt);
    document.querySelector('textarea')?.focus();
  }, [lastPrompt]);

  const handleDownloadImage = useCallback(() => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const fileName = lastPrompt.toLowerCase().replace(/\s+/g, '-').slice(0, 50) || 'imagem-ia';
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl, lastPrompt]);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4">
              {uploadedImage ? "Personalize sua Imagem" : "Descreva sua Visão"}
            </h2>
            <p className="text-gray-400 mb-6">
              {uploadedImage 
                ? "Descreva as edições que você quer fazer. Você pode adicionar, remover ou alterar elementos na imagem."
                : "Seja o mais detalhado possível para obter os melhores resultados. Pense em estilo, cor e composição."
              }
            </p>
            <PromptForm 
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerateImage}
              isLoading={isLoading}
              onImageUpload={handleImageUpload}
              onRemoveImage={handleRemoveImage}
              uploadedImage={uploadedImage}
            />
            {error && <ErrorDisplay message={error} />}
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
             <ImageDisplay 
                imageUrl={imageUrl} 
                isLoading={isLoading} 
                prompt={lastPrompt}
                onEdit={handleEditPrompt}
                onDownload={handleDownloadImage}
             />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;