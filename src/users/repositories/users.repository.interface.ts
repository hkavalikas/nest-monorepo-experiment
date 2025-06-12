import { User } from '../../db';
import { CreateUserDto, UpdateUserDto } from '../../validation/user.schema';

export interface UsersRepository {
  /**
   * Create a new user
   * @param createUserDto - The user data to create
   * @returns The created user
   */
  create(createUserDto: CreateUserDto): Promise<User>;

  /**
   * Find all users
   * @returns Array of all users
   */
  findAll(): Promise<User[]>;

  /**
   * Find a user by ID
   * @param id - The user ID
   * @returns The user if found
   */
  findOne(id: string): Promise<User>;

  /**
   * Update a user by ID
   * @param id - The user ID
   * @param updateUserDto - The user data to update
   * @returns The updated user
   */
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;

  /**
   * Remove a user by ID
   * @param id - The user ID
   * @returns The removed user
   */
  remove(id: string): Promise<User>;
}
