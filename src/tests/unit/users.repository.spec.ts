import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryImpl } from '@src/users/repositories/users.repository';
import { USERS_REPOSITORY } from '@src/users/users.constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NotFoundException } from '@nestjs/common';
import { DatabaseException } from '@src/exceptions/database.exception';
import { CreateUserDto } from '@src/validation/user.dto';

const mockDb = {
  insert: jest.fn(),
  select: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UsersRepositoryImpl', () => {
  let repository: UsersRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepositoryImpl,
        {
          provide: USERS_REPOSITORY,
          useValue: mockDb as unknown as NodePgDatabase,
        },
      ],
    }).compile();
    repository = module.get<UsersRepositoryImpl>(UsersRepositoryImpl);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = {
        name: 'A',
        email: 'a@b.com',
        password: '12345678',
      };
      const user = { id: '1', ...dto };
      mockDb.insert.mockReturnValue({
        values: jest
          .fn()
          .mockReturnValue({ returning: jest.fn().mockResolvedValue([user]) }),
      });
      const result = await repository.create(dto);
      expect(result).toEqual(user);
    });
    it('should throw DatabaseException on error', async () => {
      mockDb.insert.mockImplementation(() => {
        throw new Error('fail');
      });
      await expect(
        repository.create({
          name: 'A',
          email: 'a@b.com',
          password: '12345678',
        }),
      ).rejects.toThrow(DatabaseException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: '1' }, { id: '2' }];
      mockDb.select.mockReturnValue({
        from: jest.fn().mockResolvedValue(users),
      });
      const result = await repository.findAll();
      expect(result).toEqual(users);
    });
    it('should throw DatabaseException on error', async () => {
      mockDb.select.mockImplementation(() => {
        throw new Error('fail');
      });
      await expect(repository.findAll()).rejects.toThrow(DatabaseException);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = { id: '1' };
      mockDb.select.mockReturnValue({
        from: jest
          .fn()
          .mockReturnValue({ where: jest.fn().mockResolvedValue([user]) }),
      });
      const result = await repository.findOne('1');
      expect(result).toEqual(user);
    });
    it('should throw NotFoundException if not found', async () => {
      mockDb.select.mockReturnValue({
        from: jest
          .fn()
          .mockReturnValue({ where: jest.fn().mockResolvedValue([]) }),
      });
      await expect(repository.findOne('2')).rejects.toThrow(NotFoundException);
    });
    it('should throw DatabaseException on error', async () => {
      mockDb.select.mockImplementation(() => {
        throw new Error('fail');
      });
      await expect(repository.findOne('1')).rejects.toThrow(DatabaseException);
    });
  });

  describe('update', () => {
    it('should update a user if found', async () => {
      const user = { id: '1', name: 'B' };
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([user]),
          }),
        }),
      });
      const result = await repository.update('1', { name: 'B' });
      expect(result).toEqual(user);
    });
    it('should throw NotFoundException if not found', async () => {
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest
            .fn()
            .mockReturnValue({ returning: jest.fn().mockResolvedValue([]) }),
        }),
      });
      await expect(repository.update('2', { name: 'B' })).rejects.toThrow(
        NotFoundException,
      );
    });
    it('should throw DatabaseException on error', async () => {
      mockDb.update.mockImplementation(() => {
        throw new Error('fail');
      });
      await expect(repository.update('1', { name: 'B' })).rejects.toThrow(
        DatabaseException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user if found', async () => {
      const user = { id: '1' };
      mockDb.delete.mockReturnValue({
        where: jest
          .fn()
          .mockReturnValue({ returning: jest.fn().mockResolvedValue([user]) }),
      });
      const result = await repository.remove('1');
      expect(result).toEqual(user);
    });
    it('should throw NotFoundException if not found', async () => {
      mockDb.delete.mockReturnValue({
        where: jest
          .fn()
          .mockReturnValue({ returning: jest.fn().mockResolvedValue([]) }),
      });
      await expect(repository.remove('2')).rejects.toThrow(NotFoundException);
    });
    it('should throw DatabaseException on error', async () => {
      mockDb.delete.mockImplementation(() => {
        throw new Error('fail');
      });
      await expect(repository.remove('1')).rejects.toThrow(DatabaseException);
    });
  });
});
