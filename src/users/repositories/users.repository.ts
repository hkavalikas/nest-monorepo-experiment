import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DB_TOKEN } from '../../db/db.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { User, users } from '../../db';
import { CreateUserDto, UpdateUserDto } from '../../validation/user.schema';
import { eq } from 'drizzle-orm';
import { UsersRepository } from './users.repository.interface';
import { DatabaseException } from '../../exceptions/database.exception';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(
    @Inject(DB_TOKEN)
    private db: NodePgDatabase,
  ) {}

  /**
   * Create a new user
   * @param createUserDto - The user data to create
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const [user] = await this.db
        .insert(users)
        .values(createUserDto)
        .returning();
      return user;
    } catch (error: unknown) {
      throw new DatabaseException(`Failed to create user`, error);
    }
  }

  /**
   * Find all users
   * @returns Array of all users
   */
  async findAll(): Promise<User[]> {
    try {
      return await this.db.select().from(users);
    } catch (error: unknown) {
      throw new DatabaseException(`Failed to find users`, error);
    }
  }

  /**
   * Find a user by ID
   * @param id - The user ID
   * @returns The user if found
   * @throws NotFoundException if user not found
   */
  async findOne(id: string): Promise<User> {
    try {
      const [user] = await this.db.select().from(users).where(eq(users.id, id));
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new DatabaseException(`Failed to find user with ID ${id}`, error);
    }
  }

  /**
   * Update a user by ID
   * @param id - The user ID
   * @param updateUserDto - The user data to update
   * @returns The updated user
   * @throws NotFoundException if user not found
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const [user] = await this.db
        .update(users)
        .set(updateUserDto)
        .where(eq(users.id, id))
        .returning();

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new DatabaseException(`Failed to update user with ID ${id}`, error);
    }
  }

  /**
   * Remove a user by ID
   * @param id - The user ID
   * @returns The removed user
   * @throws NotFoundException if user not found
   */
  async remove(id: string): Promise<User> {
    try {
      const [user] = await this.db
        .delete(users)
        .where(eq(users.id, id))
        .returning();

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new DatabaseException(`Failed to remove user with ID ${id}`, error);
    }
  }
}
