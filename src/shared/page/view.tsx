import { ErrorRenderer } from '@/shared/page/components/ErrorRender';
import { LoadingSpinner } from '@/shared/page/components/LoadingSpinner';
import { usePageData } from '@/shared/page/hooks/page';
import ErrorService from './services/ErrorService';

type PageProps = {
  errorService: ErrorService;
  pageId: string;
  dataFetcher: () => void;
  renderContent: (props: { pageData: object }) => React.FC<unknown>;
};

export const PageComponent = ({ errorService, dataFetcher, pageId, renderContent }: PageProps) => {
  const { 
    pageData, 
    isLoading, 
    errorState, 
    handleRetry 
  } = usePageData({ errorService, pageId, dataFetcher });

  if (isLoading) return <LoadingSpinner />;

  if (errorState) return <ErrorRenderer state={errorState} onRetry={handleRetry} />;

  if (pageData) return renderContent({ pageData });

  throw new Error(`Вознилки проблемы при попытки отрисовки контента страницы`);
};