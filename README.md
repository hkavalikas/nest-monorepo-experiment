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

- `src/` – Application source code
- `src/db/` – Database schema and migration scripts
- `src/users/` – Example user module
- `src/validation/` – Zod schemas
- `drizzle/` – Drizzle migration files

---
