import type { Config } from 'drizzle-kit';
import configuration from '@src/config/configuration';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: configuration().databaseUrl,
  },
} satisfies Config;
