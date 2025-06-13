import { createZodDto } from 'nestjs-zod';
import {
  createUserSchema,
  updateUserSchema,
} from '@src/validation/user.schema';

export class CreateUserDto extends createZodDto(createUserSchema) {}
export class UpdateUserDto extends createZodDto(updateUserSchema) {}
