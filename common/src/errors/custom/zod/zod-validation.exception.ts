import ApplicationError from '@common/errors';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * Custom exception for Zod validation errors
 * This allows us to return more detailed error information to the client
 */
export default class ZodValidationException extends ApplicationError {
  constructor(error: ZodError) {
    // Use zod-validation-error to format the error message
    const validationError = fromZodError(error);

    super({
      code: 'APP_E_VALIDATION_ERROR',
      message: validationError.message,
      hint: null,
      status: 400,
    });
  }
}

export class ExampleZodValidationException extends ZodValidationException {
  constructor() {
    super(new ZodError([]));
  }
}
