import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { DatabaseException } from "./database.exception";
import { ZodError } from "zod";
import { ZodValidationException } from "./zod-validation.exception";

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
    const request = ctx.getRequest<Request>();

    // Log the exception
    this.logger.error(
      `Exception occurred: ${exception instanceof Error ? exception.message : String(exception)}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    // Handle different types of exceptions
    if (exception instanceof ZodError) {
      // Convert ZodError to our custom ZodValidationException
      const zodValidationException = new ZodValidationException(exception);
      const exceptionResponse = zodValidationException.getResponse();
      response
        .status(zodValidationException.getStatus())
        .json(exceptionResponse);
    } else if (exception instanceof DatabaseException) {
      // Database exceptions already have the format we want
      const exceptionResponse = exception.getResponse();
      response.status(exception.getStatus()).json(exceptionResponse);
    } else if (exception instanceof HttpException) {
      // Handle NestJS HTTP exceptions
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response.status(status).json(
        typeof exceptionResponse === "object"
          ? exceptionResponse
          : {
              statusCode: status,
              message: exceptionResponse,
              error: HttpStatus[status],
              timestamp: new Date().toISOString(),
              path: request.url,
            },
      );
    } else {
      // Handle unknown exceptions
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
        error: HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
