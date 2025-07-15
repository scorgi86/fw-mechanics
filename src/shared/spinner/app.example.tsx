import React, { useState } from 'react';
import { PageLoader } from './PageLoader';
import { DialogWithLoader } from './DialogWithLoader';
import { FileUploader } from './FileUploader';

export const App: React.FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Примеры работы со спиннером (TypeScript)</h1>
      
      <section style={{ margin: '30px 0' }}>
        <h2>1. Загрузка страницы</h2>
        <PageLoader />
      </section>
      
      <section style={{ margin: '30px 0' }}>
        <h2>2. Диалог с загрузкой</h2>
        <button 
          onClick={() => setShowDialog(true)}
          style={{ padding: '8px 16px' }}
        >
          Открыть диалог
        </button>
        {showDialog && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000
          }}>
            <DialogWithLoader onClose={() => setShowDialog(false)} />
          </div>
        )}
      </section>
      
      <section style={{ margin: '30px 0' }}>
        <h2>3. Загрузка файла с прогрессом</h2>
        <FileUploader />
      </section>
    </div>
  );
};