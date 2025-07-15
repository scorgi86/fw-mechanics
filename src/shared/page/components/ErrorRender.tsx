import { DefaultError } from '../errors/DefaultError';
import { NetworkError } from '../errors/NetworkError';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { ErrorState } from '../types';

type ErrorRendererProps = {
  state: ErrorState;
  onRetry?: () => void;
};

export const ErrorRenderer = ({ state, onRetry }: ErrorRendererProps) => {
  switch (state.type) {
    case 'NETWORK_ERROR':
      return <NetworkError error={state} onRetry={onRetry} />;
    case 'TEMPLATE':
      { const Template = state.component;
      return <Template error={state.error} />; }
    case 'LOADING_TEMPLATE':
      return <LoadingSpinner />;
    case 'DEFAULT_ERROR':
    case 'CUSTOM_ERROR':
    default:
      return <DefaultError error={state} onRetry={onRetry} />;
  }
};