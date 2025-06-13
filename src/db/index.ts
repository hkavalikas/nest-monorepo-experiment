import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@src/db/schema';
import { ConfigService } from '@nestjs/config';

let pool: Pool;
let db: NodePgDatabase<typeof schema>;

function getDatabaseUrl(): string {
  // Use @nestjs/config if available, otherwise fallback
  try {
    // This will work if called from within a NestJS context
    const configService = new ConfigService();
    return (
      configService.get<string>('databaseUrl') ??
      process.env.DATABASE_URL ??
      'postgres://postgres:postgres@localhost:5432/sample'
    );
  } catch {
    return (
      process.env.DATABASE_URL ??
      'postgres://postgres:postgres@localhost:5432/sample'
    );
  }
}

try {
  // Create a PostgresSQL connection pool
  pool = new Pool({
    connectionString: getDatabaseUrl(),
  });

  // Create a drizzle instance
  db = drizzle(pool, { schema });

  // Log successful connection
  console.log('Successfully connected to PostgreSQL database');
} catch (error) {
  console.error('Failed to initialize PostgreSQL database:');
  console.error(error);

  // Re-throw the error to prevent the application from starting with a broken database
  throw error;
}

// Export the database instance
export { db };

// Export the schema for use in other files
export * from './schema';
