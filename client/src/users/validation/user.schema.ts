import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

// Define a schema for user creation with descriptions and examples
const createUserSchema = z.object({
  name: z.string().min(2).max(100).describe('The name of the user'),
  email: z.string().email().describe('The email of the user'),
  password: z.string().min(8).max(100).describe('The password of the user'),
});

// Define a schema for user update
const updateUserSchema = createUserSchema.partial();

// Generate OpenAPI schemas from Zod schemas
const createUserOpenApi: SchemaObject = zodToOpenAPI(createUserSchema);
const updateUserOpenApi: SchemaObject = zodToOpenAPI(updateUserSchema);

export {
  createUserSchema,
  updateUserSchema,
  createUserOpenApi,
  updateUserOpenApi,
};
