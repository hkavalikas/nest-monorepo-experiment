import type { Config } from 'drizzle-kit';
import configuration from '@common/db/configuration';

export default {
  schema: './common/src/db/schema.ts',
  out: './common/src/db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: configuration().databaseUrl,
  },
} satisfies Config;
