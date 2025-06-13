import { Global, Module } from '@nestjs/common';
import { db } from './index';

// Provider token for the database
export const DB_TOKEN = Symbol('DB_TOKEN');

@Global()
@Module({
  providers: [
    {
      provide: DB_TOKEN,
      useValue: db,
    },
  ],
  exports: [DB_TOKEN],
})
export class DbModule {}
