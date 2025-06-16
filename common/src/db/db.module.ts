import { Global, Module } from '@nestjs/common';
import { db } from './index';
import { env } from '@common/env';

@Global()
@Module({
  providers: [
    {
      provide: env.DB_TOKEN,
      useValue: db,
    },
  ],
  exports: [env.DB_TOKEN],
})
export class DbModule {}
