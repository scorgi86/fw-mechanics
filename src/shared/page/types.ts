export type ErrorState =
  | { type: 'IDLE', error: null }
  | { type: 'NETWORK_ERROR', error: null }
  | { type: 'TEMPLATE'; component: React.ComponentType<ErrorTemplateProps>; error: ApiError }
  | { type: 'DEFAULT_ERROR'; error: ApiError }
  | { type: 'CUSTOM_ERROR'; error: ApiError }
  | { type: 'LOADING_TEMPLATE', error: null };

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

export type TemplateLoader = () => Promise<{ default: React.ComponentType<{ error: ApiError }> }>;
export type ErrorHandler = (error: ApiError) => Promise<void> | void;

export type ErrorTemplateProps = {
  error: ErrorState;
  onRetry?: () => void;
}