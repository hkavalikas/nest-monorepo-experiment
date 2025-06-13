import { Global, Module } from '@nestjs/common';
import { db } from '@src/db';

// Provider token for the database
export const DB_TOKEN = 'DB_TOKEN';

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
