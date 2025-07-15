import { TemplateLoader, ErrorHandler, ApiError, ErrorState } from '@/shared/page/types';

export class ErrorService {
  private templates: Map<number, TemplateLoader>;
  private handlers: Map<number, ErrorHandler>;

  constructor() {
    this.templates = new Map();
    this.handlers = new Map();
  }

  registerTemplate(statusCode: number, loader: TemplateLoader): void {
    this.templates.set(statusCode, loader);
  }

  registerHandler(statusCode: number, handler: ErrorHandler): void {
    this.handlers.set(statusCode, handler);
  }

  async handleError(error: ApiError): Promise<ErrorState> {
    if (error?.message === 'Failed to fetch') {
      return { type: 'NETWORK_ERROR', error: null };
    }

    const status = error?.status;
    if (!status) return { type: 'DEFAULT_ERROR', error };

    if (this.handlers.has(status)) {
      await this.handlers.get(status)!(error);
      return { type: 'CUSTOM_ERROR', error };
    }

    if (this.templates.has(status)) {
      try {
        const loader = this.templates.get(status)!;
        const module = await loader();
        return { 
          type: 'TEMPLATE',
          component: module.default,
          error
        };
      } catch (e) {
        console.error('Template load failed:', e);
      }
    }

    return { type: 'DEFAULT_ERROR', error };
  }
}

export const commonErrorService = new ErrorService();

export default ErrorService;