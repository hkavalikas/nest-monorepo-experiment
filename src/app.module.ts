import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { DbModule } from '@src/db/db.module';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [DbModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
