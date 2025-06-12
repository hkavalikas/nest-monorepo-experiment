<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with:

- [pnpm](https://pnpm.io/) for package management
- [zod](https://zod.dev/) for validation
- [drizzle](https://orm.drizzle.team/) for ORM and schema migrations
- [esbuild](https://esbuild.github.io/) for building

## Project setup

```bash
# Install pnpm if you don't have it
$ npm install -g pnpm

# Install dependencies
$ pnpm install
```

## Database setup

Before running any database operations, make sure the PostgreSQL Docker container is running:

```bash
# Start the PostgreSQL container
$ pnpm docker:up
```

Then you can:

```bash
# Generate migrations based on your schema
$ pnpm db:generate

# Run migrations
$ pnpm db:migrate

```

The PostgreSQL database will be available at:
- Host: localhost
- Port: 5432
- Username: postgres
- Password: postgres
- Database: sample

You can connect to it using any PostgreSQL client or use the built-in Drizzle Studio:

```bash
$ pnpm db:studio
```

### Environment Variables

The project uses the following environment variables that can be configured in the `.env` file:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/sample
PORT=3000
NODE_ENV=development
```

## Compile and run the project

```bash
# development
$ pnpm start
```

## Run tests

```bash
# run all tests (unit and e2e) with turbo for faster execution
$ pnpm test

# run only unit tests
$ pnpm test:unit

# run only e2e tests
$ pnpm test:e2e
```

All tests are now located in the `src/tests` directory:
- Unit tests: `src/tests/unit/*.spec.ts`
- Integration tests: `src/tests/integration/*.e2e-spec.ts`

The tests use turbo for faster execution with caching.

## Project Features

### Validation with nestjs-zod

This project uses [nestjs-zod](https://github.com/BenLorantfy/nestjs-zod) for validation, which integrates [Zod](https://zod.dev/) with NestJS. Zod schemas are defined in the `src/validation` directory and used to create DTO classes.

Example usage:

```typescript
// Define a schema
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// Create a DTO class from the schema
export class UserDto extends createZodDto(userSchema) {}

// Use it in a controller
@Post()
create(@Body() createUserDto: UserDto) {
  // createUserDto is now validated and typed
}
```

The validation is handled automatically by the global ZodValidationPipe, which is configured in `main.ts`.

### Database with Drizzle ORM

This project uses [Drizzle ORM](https://orm.drizzle.team/) for database access and migrations. The database schema is defined in `src/db/schema.ts`.

Example usage:

```typescript
// Query the database
const users = await db.select().from(usersTable);

// Insert data
const newUser = await db.insert(usersTable).values({ name: 'John', email: 'john@example.com' }).returning();
```
