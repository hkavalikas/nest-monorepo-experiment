import { createZodDto } from 'nestjs-zod';
import {
  createUserSchema,
  updateUserSchema,
} from '@client/users/validation/user.schema';

export class CreateUserDto extends createZodDto(createUserSchema) {}
export class UpdateUserDto extends createZodDto(updateUserSchema) {}
