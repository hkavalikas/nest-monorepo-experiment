import { z } from 'zod';
import 'dotenv/config';

const commonEnvSchema = z.object({
  LOG_LEVEL: z.string().default('info'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z
    .string()
    .default('postgres://postgres:postgres@localhost:5432/'),
  NODE_ENV: z.string(),
});

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
