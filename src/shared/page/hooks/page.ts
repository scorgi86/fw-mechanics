import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from './error';
import { ErrorService } from '@/shared/page/services/ErrorService';
import { ApiError } from '@/shared/page/types';

type UsePageDataOptions = {
  errorService: ErrorService;
  pageId: string;
};

export const usePageData = ({ errorService, pageId }: UsePageDataOptions) => {
  const queryClient = useQueryClient();
  const { state, handleError, clearError } = useErrorHandler(errorService);

  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pageData', pageId],
    queryFn: fetchPageData,
    retry: false,
    onError: handleError,
  });

  const handleRetry = () => {
    clearError();
    // queryClient.refetchQueries(['pageData', pageId]);
  };

  return {
    pageData: data,
    isLoading,
    isError,
    errorState: state,
    handleRetry,
  };
};

async function fetchPageData({ queryKey, fetchData }: { queryKey: [string, string] }) {
  const [, pageId] = queryKey;
  const response = await fetchData(`/api/pages/${pageId}`);
  
  if (!response.ok) {
    const error: ApiError = new Error('API Error');
    error.status = response.status;
    error.data = await response.json();
    throw error;
  }
  
  return response.json();
}