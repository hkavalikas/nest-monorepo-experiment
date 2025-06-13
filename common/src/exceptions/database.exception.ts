import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * Custom exception for database errors
 * This allows us to return more detailed error information to the client
 */
export class DatabaseException extends HttpException {
  constructor(message: string, error: unknown) {
    // Create a more detailed error response
    const errorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error: "Database Error",
      details:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack:
                process.env.NODE_ENV === "production" ? undefined : error.stack,
            }
          : String(error),
    };

    super(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
