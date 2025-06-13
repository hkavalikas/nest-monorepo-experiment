import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import { UsersRepository } from '@src/users/repositories/users.repository.interface';
import { ZodValidationPipe } from 'nestjs-zod';
import { USERS_REPOSITORY } from '@src/users/users.constants';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let mockUsersRepository: Partial<UsersRepository>;

  const testUser = {
    id: 'test-uuid',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    // Create mock repository
    mockUsersRepository = {
      create: jest.fn().mockResolvedValue(testUser),
      findAll: jest.fn().mockResolvedValue([testUser]),
      findOne: jest.fn().mockImplementation((id) => {
        if (id === 'test-uuid') {
          return Promise.resolve(testUser);
        }
        // Throw NotFoundException for non-existent user
        throw new NotFoundException(`User with ID ${id} not found`);
      }),
      update: jest.fn().mockImplementation((id, updateDto) => {
        if (id === 'test-uuid') {
          return Promise.resolve({
            ...testUser,
            ...updateDto,
          });
        }
        // Throw NotFoundException for non-existent user
        throw new NotFoundException(`User with ID ${id} not found`);
      }),
      remove: jest.fn().mockImplementation((id) => {
        if (id === 'test-uuid') {
          return Promise.resolve(testUser);
        }
        // Throw NotFoundException for non-existent user
        throw new NotFoundException(`User with ID ${id} not found`);
      }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(USERS_REPOSITORY)
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    // Explicitly apply ZodValidationPipe in test setup to ensure validation in e2e tests
    app.useGlobalPipes(new ZodValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    it('should create a new user', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(createUserDto.name);
          expect(res.body.email).toBe(createUserDto.email);
          // Fix ESLint unbound-method issues
          const createFn = mockUsersRepository.create;
          expect(createFn).toHaveBeenCalledWith(createUserDto);
        });
    });

    it('should return 400 for invalid data', () => {
      const invalidUserDto = {
        name: 'T', // Too short
        email: 'not-an-email',
        password: 'short', // Too short
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(invalidUserDto)
        .expect(400);
    });
  });

  describe('/users (GET)', () => {
    it('should return an array of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          const findAllFn = mockUsersRepository.findAll;
          expect(findAllFn).toHaveBeenCalled();
        });
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return a user by id', () => {
      return request(app.getHttpServer())
        .get('/users/test-uuid')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', 'test-uuid');
          expect(res.body.name).toBe(testUser.name);
          const findOneFn = mockUsersRepository.findOne;
          expect(findOneFn).toHaveBeenCalledWith('test-uuid');
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/users/non-existent-id')
        .expect(404);
    });
  });

  describe('/users/:id (PATCH)', () => {
    it('should update a user', () => {
      const updateUserDto = {
        name: 'Updated User',
      };

      return request(app.getHttpServer())
        .patch('/users/test-uuid')
        .send(updateUserDto)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', 'test-uuid');
          expect(res.body.name).toBe(updateUserDto.name);
          const updateFn = mockUsersRepository.update;
          expect(updateFn).toHaveBeenCalledWith('test-uuid', updateUserDto);
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .patch('/users/non-existent-id')
        .send({ name: 'Updated User' })
        .expect(404);
    });

    it('should return 400 for invalid data', () => {
      const invalidUpdateDto = {
        name: '', // Empty string is invalid
      };

      return request(app.getHttpServer())
        .patch('/users/test-uuid')
        .send(invalidUpdateDto)
        .expect(400);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete a user', () => {
      return request(app.getHttpServer())
        .delete('/users/test-uuid')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', 'test-uuid');
          const removeFn = mockUsersRepository.remove;
          expect(removeFn).toHaveBeenCalledWith('test-uuid');
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .delete('/users/non-existent-id')
        .expect(404);
    });
  });
});
