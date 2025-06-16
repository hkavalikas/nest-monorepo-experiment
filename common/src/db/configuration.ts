import { env } from '@common/env';

export default () => ({
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
});
