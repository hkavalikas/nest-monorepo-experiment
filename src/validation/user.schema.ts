import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// Define a schema for user creation
export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

// Define a schema for user update
export const updateUserSchema = createUserSchema.partial();

// Create DTO classes from the schemas
export class CreateUserDto extends createZodDto(createUserSchema) {}
export class UpdateUserDto extends createZodDto(updateUserSchema) {}
