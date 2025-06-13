import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import configuration from "./configuration";

// This script runs migrations on the database
async function main() {
  console.log("Running migrations...");

  let pool: Pool;
  try {
    // Create a PostgresSQL connection pool
    pool = new Pool({
      connectionString: configuration().databaseUrl,
    });

    const db = drizzle(pool);

    // This will run migrations from the specified directory
    await migrate(db, { migrationsFolder: "drizzle" });

    console.log("Migrations completed successfully");

    // Close the pool
    await pool.end();
  } catch (error) {
    console.error("Migration failed:");
    console.error(error);

    // Try to close the pool if it exists
    // @ts-expect-error - pool might not be defined if the connection failed
    if (pool) {
      await pool.end().catch(console.error);
    }

    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unexpected error during migration:", err);
  process.exit(1);
});
