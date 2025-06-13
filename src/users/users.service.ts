import { Inject, Injectable } from '@nestjs/common';
import { User } from '../db';
import { CreateUserDto, UpdateUserDto } from '../validation/user.schema';
import { UsersRepository } from './repositories/users.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: UsersRepository,
  ) {}

  /**
   * Create a new user
   * @param createUserDto - The user data to create
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  /**
   * Find all users
   * @returns Array of all users
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  /**
   * Find a user by ID
   * @param id - The user ID
   * @returns The user if found
   * @throws NotFoundException if user not found
   */
  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  /**
   * Update a user by ID
   * @param id - The user ID
   * @param updateUserDto - The user data to update
   * @returns The updated user
   * @throws NotFoundException if user not found
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(id, updateUserDto);
  }

  /**
   * Remove a user by ID
   * @param id - The user ID
   * @returns The removed user
   * @throws NotFoundException if user not found
   */
  async remove(id: string): Promise<User> {
    return this.usersRepository.remove(id);
  }
}
