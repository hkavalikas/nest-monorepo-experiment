import BadRequest from './custom/bad-request';
import DatabaseException from './custom/database/database.exception';
import ZodValidationException from './custom/zod/zod-validation.exception';

export { BadRequest, DatabaseException, ZodValidationException };

export type ApplicationErrorParams = {
  code?: string;
  message?: string;
  hint?: string | null;
  status?: number;
};

export type HTTPErrorParams = Omit<ApplicationErrorParams, 'status'>;

export default class ApplicationError extends Error {
  public message: string = 'ApplicationError';

  public hint: string | null = null;

  public code: string = 'APP_E_APPLICATION_ERROR';

  public status: number = 500;

  constructor(props?: ApplicationErrorParams) {
    super();
    if (props !== undefined && props !== null) {
      const { code, message, hint, status } = props;
      if (message !== undefined && message !== null) {
        this.message = message;
      }
      if (status !== undefined && status !== null) {
        this.status = status;
      }
      if (code !== undefined && code !== null) {
        this.code = code;
      }
      if (hint !== undefined && hint !== null) {
        this.hint = hint;
      }
    }
    delete this.stack;
  }

  public buildHeaders(): Record<string, string> {
    return {};
  }
}
