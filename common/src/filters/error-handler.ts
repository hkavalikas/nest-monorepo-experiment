import ApplicationError from '@common/errors';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { fromError, isValidationErrorLike } from 'zod-validation-error';

@Catch()
export class ErrorHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Log the exception
    console.error(
      `Exception occurred: ${exception instanceof Error ? exception.message : String(exception)}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    try {
      // Format and send the response
      const formattedResponse = formatExceptionResponse(exception);

      response.status(formattedResponse.status).json({
        ...formattedResponse.body,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      // Log fallback error
      console.error(
        `Fallback error: ${error instanceof Error ? error.message : String(error)}`,
      );

      // Fallback for unexpected errors
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
        code: 'APP_E_INTERNAL_ERROR',
      });
    }
  }
}

/**
 * Formats exceptions into a consistent response structure.
 * @param exception The exception to format.
 * @returns An object containing the HTTP status and response body.
 */
export interface FormattedExceptionResponse {
  status: number;
  body: {
    statusCode: number;
    message: string;
    code: string;
    hint: string | null;
  };
}

export function formatExceptionResponse(
  exception: unknown,
): FormattedExceptionResponse {
  let status: number;
  let message: string;
  let code: string;
  let hint: string | null = null;

  if (exception instanceof ApplicationError) {
    status = exception.status;
    message = exception.message;
    code = exception.code;
    hint = exception.hint;
  } else if (
    isValidationErrorLike(exception) ||
    (exception as Error).name.includes('ZodError')
  ) {
    status = 422;
    hint = fromError(exception as Error).toString();
    message = hint;
    code = 'APP_E_VALIDATION_ERROR';
  } else if (exception instanceof HttpException) {
    status = exception.getStatus();
    message = exception.message;
    code = 'APP_E_HTTP_EXCEPTION';
  } else {
    status = 500;
    message = 'Internal server error';
    code = 'APP_E_INTERNAL_ERROR';
  }

  return {
    status,
    body: {
      statusCode: status,
      message,
      code,
      hint,
    },
  };
}
