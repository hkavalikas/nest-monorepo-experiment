import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from '@src/users/users.constants';
import { UsersService } from '@src/users/users.service';
import { UsersController } from '@src/users/users.controller';
import { UsersRepositoryImpl } from '@src/users/repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepositoryImpl,
    },
  ],
  exports: [UsersService, USERS_REPOSITORY],
})
export class UsersModule {}
