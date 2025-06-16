import { Module } from '@nestjs/common';
import { UsersService } from '@client/users/users.service';
import { UsersController } from '@client/users/users.controller';
import { UsersRepositoryImpl } from '@client/users/repositories/users.repository';
import { env } from '@common/env';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: env.USERS_REPOSITORY,
      useClass: UsersRepositoryImpl,
    },
  ],
  exports: [UsersService, env.USERS_REPOSITORY],
})
export class UsersModule {}
