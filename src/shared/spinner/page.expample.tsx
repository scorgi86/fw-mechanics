import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';
import { PageData } from './types';

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Имитация API запроса
        const mockData: PageData = {
          id: 1,
          title: 'Загруженная страница',
          content: 'Данные успешно загружены'
        };
        
        await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация задержки
        setData(mockData);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div>
      <h2>{data?.title}</h2>
      <p>{data?.content}</p>
    </div>
  );
};