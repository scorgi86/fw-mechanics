import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';
import { DialogData } from './types';

interface DialogWithLoaderProps {
  onClose: () => void;
}

export const DialogWithLoader: React.FC<DialogWithLoaderProps> = ({ onClose }) => {
  const [dialogLoading, setDialogLoading] = useState<boolean>(true);
  const [dialogData, setDialogData] = useState<DialogData | null>(null);

  useEffect(() => {
    const loadDialogData = async () => {
      try {
        // Имитация API запроса
        const mockData: DialogData = {
          id: 1,
          message: 'Диалоговые данные',
          details: 'Эти данные были загружены в диалоге'
        };
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDialogData(mockData);
      } catch (error) {
        console.error('Ошибка загрузки диалога:', error);
      } finally {
        setDialogLoading(false);
      }
    };

    loadDialogData();
  }, []);

  return (
    <div className="dialog" style={{ 
      position: 'relative', 
      minHeight: '200px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: 'white'
    }}>
      <Spinner loading={dialogLoading} local={true} />
      
      {dialogData && (
        <div>
          <h3>{dialogData.message}</h3>
          <p>{dialogData.details}</p>
        </div>
      )}
      
      <button 
        onClick={onClose}
        style={{ marginTop: '20px' }}
      >
        Закрыть
      </button>
    </div>
  );
};