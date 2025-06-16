import { z } from 'zod';
import 'dotenv/config';

const constants = z.object({
  USERS_REPOSITORY: z.symbol().default(Symbol('USERS_REPOSITORY')),
  DB_TOKEN: z.symbol().default(Symbol('DB_TOKEN')),
});

const commonEnvSchema = z
  .object({
    LOG_LEVEL: z.string().default('info'),
    PORT: z.string().default('3000'),
    DATABASE_URL: z
      .string()
      .default('postgres://postgres:postgres@localhost:5432/'),
    NODE_ENV: z.string(),
  })
  .merge(constants);

const productionEnvSchema = z
  .object({
    RUNTIME_ENV: z.literal('PRODUCTION'),
  })
  .merge(commonEnvSchema);

const localEnvSchema = z
  .object({
    RUNTIME_ENV: z.literal('LOCAL'),
  })
  .merge(commonEnvSchema);

const envSchema = z
  .object({
    RUNTIME_ENV: z.enum(['PRODUCTION', 'LOCAL']).default('LOCAL'),
  })
  .and(
    z.discriminatedUnion('RUNTIME_ENV', [productionEnvSchema, localEnvSchema]),
  );

export const env = envSchema.parse(process.env);
