import React, { useState } from 'react';

export interface ChildModalProps {
  title: string;
  initialValue: string;
}

export const ChildModal: React.FC<ChildModalProps & { onClose: (result?: string) => void }> = ({ 
  title, 
  initialValue, 
  onClose 
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = () => {
    onClose(value); // Передаем результат в родительское окно
  };

  return (
    <div className="modal">
      <h2>{title}</h2>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
      <div className="modal-actions">
        <button onClick={() => onClose(undefined)}>Отмена</button>
        <button onClick={handleSubmit}>Сохранить</button>
      </div>
    </div>
  );
};