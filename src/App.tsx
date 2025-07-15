import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { commonErrorService } from '@/shared/page/services/ErrorService';

const errorService = commonErrorService;

// Регистрация шаблонов с lazy loading
errorService.registerTemplate(404, () => import('@/shared/page/errors/NotFound'));
errorService.registerTemplate(403, () => import('@/shared/page/errors/Forbidden'));

// Регистрация кастомного обработчика
errorService.registerHandler(401, () => {
  window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
});

export const App = () => {
  const LazyProductPage = React.lazy(() => import('@/pages/ProductPage'));

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/pages/:pageId" 
          element={<LazyProductPage />} 
        />
      </Routes>
    </BrowserRouter>
  );
};