# NestJS Monorepo Experiment

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A modern, monorepo-style NestJS starter with TypeScript, Drizzle ORM, Zod validation, and fast builds.

## Features

- **NestJS** for scalable server-side applications
- **pnpm** for fast, efficient package management
- **Drizzle ORM** for type-safe database access and migrations
- **Zod** for schema validation
- **esbuild** for lightning-fast builds
- **dotenv-cli** for environment variable management
- **Turbo** for orchestrating tasks and tests

## Getting Started

### 1. Install dependencies

```bash
# Install pnpm globally if you don't have it
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 2. Environment Variables

Create a `.env` file in the project root. Example:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/sample
PORT=3000
NODE_ENV=development
```

All scripts automatically load variables from `.env` via dotenv-cli.

### 3. Database Setup

Start your PostgreSQL instance (e.g., via Docker):

```bash
# Example: using Docker Compose (if you have a docker-compose.yml)
docker-compose up -d
```

Generate and run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

### 4. Build and Run

```bash
# Build the project
pnpm build

# Start the application
pnpm start

# For development with hot-reload
pnpm dev
```

### 5. Code Quality

```bash
# Format code
pnpm format

# Lint code
pnpm lint
```

### 6. Testing

```bash
# Run all tests (unit and e2e)
pnpm test

# Run only unit tests
pnpm test:unit

# Run only e2e tests
pnpm test:e2e
```

## Quick Start

```bash
pnpm install
pnpm dev
```

## Centralized Configuration

- Uses [`@nestjs/config`](https://docs.nestjs.com/techniques/configuration) for environment variables and configuration. See `src/config/configuration.ts`.

## Running Tests

- **Unit tests:**
  ```bash
  pnpm test:unit
  ```
- **E2E tests:**
  ```bash
  pnpm test:e2e
  ```

## Linting & Formatting

- Lint and format your code with:
  ```bash
  pnpm lint
  pnpm format
  ```
- (Recommended) Set up a pre-commit hook with [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged):
  ```bash
  pnpm add -D husky lint-staged
  npx husky install
  npx husky add .husky/pre-commit "npx lint-staged"
  ```
  Add to your `package.json`:
  ```json
  "lint-staged": {
    "*.{js,ts,json,md}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
  ```

## Contributing

- Follow the code style enforced by ESLint and Prettier.
- Use the `@src` alias for all internal imports.
- Write unit and e2e tests for new features.

## Scripts Reference

- `pnpm build` – Build the project using esbuild
- `pnpm start` – Start the compiled app
- `pnpm dev` – Start in development mode with hot-reload
- `pnpm db:generate` – Generate Drizzle migrations
- `pnpm db:migrate` – Run database migrations
- `pnpm format` – Format code with Prettier
- `pnpm lint` – Lint code with ESLint
- `pnpm test` – Run all tests
- `pnpm test:unit` – Run unit tests
- `pnpm test:e2e` – Run end-to-end tests

## Project Structure

- `src/` — Main source code
- `src/db/` — Database connection, schema, and module
- `src/users/` — User module (controller, service, repository)
- `src/validation/` — DTOs and Zod schemas
- `src/exceptions/` — Custom exception filters and classes
- `src/config/` — Centralized configuration
- `src/tests/` — Unit and integration tests

---

For more details, see the comments in each file and the [NestJS documentation](https://docs.nestjs.com/).
