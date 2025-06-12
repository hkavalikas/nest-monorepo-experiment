import { z } from 'zod';
import { createZodDto, zodToOpenAPI } from 'nestjs-zod';

// Define a schema for user creation with descriptions and examples
export const createUserSchema = z.object({
  name: z.string().min(2).max(100).describe('The name of the user'),
  email: z.string().email().describe('The email of the user'),
  password: z.string().min(8).max(100).describe('The password of the user'),
});

// Define a schema for user update
export const updateUserSchema = createUserSchema.partial();

// Create DTO classes from the schemas
export class CreateUserDto extends createZodDto(createUserSchema) {}

export class UpdateUserDto extends createZodDto(updateUserSchema) {}

// Generate OpenAPI schemas from Zod schemas
// Using 'as any' to avoid TypeScript errors with ExtendedSchemaObject
export const createUserOpenApi = zodToOpenAPI(createUserSchema);
export const updateUserOpenApi = zodToOpenAPI(updateUserSchema);
