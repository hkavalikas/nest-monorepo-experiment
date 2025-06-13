import { Module } from "@nestjs/common";
import { AppController } from "@client/app.controller";
import { AppService } from "@client/app.service";
import { DbModule } from "@common/db/db.module";
import { UsersModule } from "@client/users/users.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "@common/db/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DbModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
