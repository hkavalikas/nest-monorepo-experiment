import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { CreateUserDto, UpdateUserDto } from '../../validation/user.schema';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USERS_REPOSITORY',
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      const expectedResult = {
        id: 'some-uuid',
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersRepository.create.mockResolvedValue(expectedResult);

      const result = await service.create(createUserDto);

      expect(result).toEqual(expectedResult);
      // Fix ESLint unbound-method issues
      const createFn = mockUsersRepository.create;
      expect(createFn).toHaveBeenCalledWith(createUserDto);
      expect(createFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedResult = [
        {
          id: 'some-uuid-1',
          name: 'User 1',
          email: 'user1@example.com',
          password: 'password123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'some-uuid-2',
          name: 'User 2',
          email: 'user2@example.com',
          password: 'password456',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockUsersRepository.findAll.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      const findAllFn = mockUsersRepository.findAll;
      expect(findAllFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single user if found', async () => {
      const userId = 'some-uuid';
      const expectedResult = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(userId);

      expect(result).toEqual(expectedResult);
      const findOneFn = mockUsersRepository.findOne;
      expect(findOneFn).toHaveBeenCalledWith(userId);
      expect(findOneFn).toHaveBeenCalledTimes(1);
    });

    it('should propagate NotFoundException if user is not found', async () => {
      const userId = 'non-existent-id';
      const errorMessage = `User with ID ${userId} not found`;

      mockUsersRepository.findOne.mockRejectedValue(
        new NotFoundException(errorMessage),
      );

      await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(userId)).rejects.toThrow(errorMessage);
      const findOneFn = mockUsersRepository.findOne;
      expect(findOneFn).toHaveBeenCalledWith(userId);
      expect(findOneFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('update', () => {
    it('should update a user if found', async () => {
      const userId = 'some-uuid';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };
      const expectedResult = {
        id: userId,
        name: 'Updated User',
        email: 'test@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersRepository.update.mockResolvedValue(expectedResult);

      const result = await service.update(userId, updateUserDto);

      expect(result).toEqual(expectedResult);
      const updateFn = mockUsersRepository.update;
      expect(updateFn).toHaveBeenCalledWith(userId, updateUserDto);
      expect(updateFn).toHaveBeenCalledTimes(1);
    });

    it('should propagate NotFoundException if user is not found', async () => {
      const userId = 'non-existent-id';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };
      const errorMessage = `User with ID ${userId} not found`;

      mockUsersRepository.update.mockRejectedValue(
        new NotFoundException(errorMessage),
      );

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.update(userId, updateUserDto)).rejects.toThrow(
        errorMessage,
      );
      const updateFn = mockUsersRepository.update;
      expect(updateFn).toHaveBeenCalledWith(userId, updateUserDto);
      expect(updateFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('remove', () => {
    it('should remove a user if found', async () => {
      const userId = 'some-uuid';
      const expectedResult = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersRepository.remove.mockResolvedValue(expectedResult);

      const result = await service.remove(userId);

      expect(result).toEqual(expectedResult);
      const removeFn = mockUsersRepository.remove;
      expect(removeFn).toHaveBeenCalledWith(userId);
      expect(removeFn).toHaveBeenCalledTimes(1);
    });

    it('should propagate NotFoundException if user is not found', async () => {
      const userId = 'non-existent-id';
      const errorMessage = `User with ID ${userId} not found`;

      mockUsersRepository.remove.mockRejectedValue(
        new NotFoundException(errorMessage),
      );

      await expect(service.remove(userId)).rejects.toThrow(NotFoundException);
      await expect(service.remove(userId)).rejects.toThrow(errorMessage);
      const removeFn = mockUsersRepository.remove;
      expect(removeFn).toHaveBeenCalledWith(userId);
      expect(removeFn).toHaveBeenCalledTimes(2);
    });
  });
});
