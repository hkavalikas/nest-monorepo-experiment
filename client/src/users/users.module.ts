import { Module } from "@nestjs/common";
import { USERS_REPOSITORY } from "@client/users/users.constants";
import { UsersService } from "@client/users/users.service";
import { UsersController } from "@client/users/users.controller";
import { UsersRepositoryImpl } from "@client/users/repositories/users.repository";

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
