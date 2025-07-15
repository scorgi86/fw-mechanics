import React, { useState } from 'react';
import { Spinner } from './Spinner';

export const FileUploader: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    simulateFileUpload(file);
  };

  const simulateFileUpload = (file: File) => {
    setUploading(true);
    setProgress(0);

    // Имитация загрузки файла
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploading(false), 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Загрузка файла</h3>
      <input 
        type="file" 
        onChange={handleFileUpload} 
        disabled={uploading}
      />
      <Spinner loading={uploading} progress={progress} />
    </div>
  );
};