import ApplicationError, { HTTPErrorParams } from '@common/errors';

/**
 * Custom exception for database errors
 * This allows us to return more detailed error information to the client
 */
export default class DatabaseException extends ApplicationError {
  constructor(message: string, params?: HTTPErrorParams & { error?: unknown }) {
    const { code, hint, error } = params || {};

    super({
      code: code || 'APP_E_DATABASE_ERROR',
      message: message || 'Database Error',
      hint:
        hint ??
        (error != null && typeof error === 'object' && 'detail' in error
          ? (error as { detail: string }).detail
          : null),
      status: 500,
    });

    if (error) {
      this.stack = error instanceof Error ? error.stack : undefined;
    }
  }
}

export class ExampleDatabaseException extends DatabaseException {
  constructor() {
    super(`Example database error`, {
      code: 'DB_E_EXAMPLE_DATABASE_ERROR',
    });
  }
}
