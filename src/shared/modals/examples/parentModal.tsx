import React from 'react';
import { modalService } from '../services/service';
import { ChildModal, ChildModalProps } from './childModal';

export const ParentComponent: React.FC = () => {
  const handleOpenChildModal = async () => {
    try {
      // Открываем дочернее модальное окно и ждем результат
      const result = await modalService.openModal<ChildModalProps, string>(
        {
          key: 'parentModalKey',
          component: ChildModal,
          props: {
            title: 'Дочернее окно',
            initialValue: 'Значение по умолчанию'
          }
        }
      );
      
      console.log('Результат из дочернего окна:', result);
      // Здесь можно обработать результат
    } catch (error) {
      console.error('Ошибка или закрытие без результата', error);
    }
  };

  return (
    <div>
      <h1>Родительский компонент</h1>
      <button onClick={handleOpenChildModal}>Открыть дочернее окно</button>
    </div>
  );
};