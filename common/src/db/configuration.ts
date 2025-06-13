export default () => ({
  port: process.env.PORT ?? 3000,
  databaseUrl:
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/sample",
});
