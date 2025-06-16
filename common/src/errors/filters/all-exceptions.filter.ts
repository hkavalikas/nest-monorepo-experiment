import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import DatabaseException from '@common/errors/custom/database/database.exception';
import ZodValidationException from '@common/errors/custom/zod/zod-validation.exception';

/**
 * Global exception filter that catches all exceptions
 * and formats them in a consistent way
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Log the exception
    this.logger.error(
      `Exception occurred: ${exception instanceof Error ? exception.message : String(exception)}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    // Handle different types of exceptions
    if (exception instanceof ZodValidationException) {
      // Convert ZodError to our custom ZodValidationException
      const exceptionResponse = {
        code: exception.code,
        message: exception.message,
        hint: exception.hint,
        status: exception.status,
      };
      response.status(exception.status).json(exceptionResponse);
    } else if (exception instanceof DatabaseException) {
      // Database exceptions already have the format we want
      const exceptionResponse = {
        code: exception.code,
        message: exception.message,
        hint: exception.hint,
        status: exception.status,
      };
      response.status(exception.status).json(exceptionResponse);
    } else if (exception instanceof HttpException) {
      // Handle NestJS HTTP exceptions
      const exceptionResponse = exception.getResponse();
      response.status(exception.getStatus()).json(exceptionResponse);
    }
  }
}
