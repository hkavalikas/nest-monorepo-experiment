import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import configuration from "./configuration";

let pool: Pool;
let db: NodePgDatabase<typeof schema>;

try {
  // Create a PostgresSQL connection pool
  pool = new Pool({
    connectionString: configuration().databaseUrl,
  });

  // Create a drizzle instance
  db = drizzle(pool, { schema });

  // Log successful connection
  console.log("Successfully connected to PostgreSQL database");
} catch (error) {
  console.error("Failed to initialize PostgreSQL database:");
  console.error(error);

  // Re-throw the error to prevent the application from starting with a broken database
  throw error;
}

// Export the database instance
export { db };

// Export the schema for use in other files
export * from "./schema";
