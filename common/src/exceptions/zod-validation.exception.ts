import { HttpException, HttpStatus } from "@nestjs/common";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

/**
 * Custom exception for Zod validation errors
 * This allows us to return more detailed error information to the client
 */
export class ZodValidationException extends HttpException {
  constructor(error: ZodError) {
    // Use zod-validation-error to format the error message
    const validationError = fromZodError(error);

    // Create a more detailed error response
    const errorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: validationError.message,
      error: "Validation Error",
      details: error.errors.map((err) => ({
        code: err.code,
        path: err.path,
        message: err.message,
      })),
    };

    super(errorResponse, HttpStatus.BAD_REQUEST);
  }
}
