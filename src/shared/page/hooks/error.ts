import { useState, useCallback } from 'react';
import type { ErrorState, ApiError } from '@/shared/page/types';
import { ErrorService } from '@/shared/page/services/ErrorService';

export const useErrorHandler = (service: ErrorService) => {
  const [state, setState] = useState<ErrorState>({ type: 'IDLE', error: null });

  const handleError = useCallback(async (error: ApiError) => {
    setState({ type: 'LOADING_TEMPLATE', error: null });
    const result = await service.handleError(error);
    setState(result);
  }, [service]);

  const clearError = useCallback(() => {
    setState({ type: 'IDLE', error: null });
  }, []);

  return { state, handleError, clearError };
};