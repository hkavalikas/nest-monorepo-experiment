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

# Monorepo Project Setup

This project uses a monorepo structure with pnpm workspaces, TurboRepo, and TypeScript. It is organized into two main packages:

- **client/**: Contains the application-specific code (NestJS app, controllers, modules, etc.)
- **common/**: Contains all reusable code (database, config, exceptions, etc.)

## Structure

```
client/           # Application-specific code
  src/
    ...
common/           # Reusable modules (db, config, exceptions, etc.)
  src/
    ...
tests/            # Unit and integration tests
  unit/
  integration/

package.json      # Root scripts and dependencies
pnpm-workspace.yaml
eslint.config.mjs # Root ESLint config (extended by subprojects)
turbo.json        # TurboRepo pipeline config
```

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   ```

2. **Build all packages**
   ```sh
   pnpm build
   ```
   - Builds both client and common, outputting to their respective `dist/` folders.

3. **Run the app in development**
   ```sh
   pnpm dev
   ```

4. **Lint and format**
   ```sh
   pnpm lint
   pnpm format
   ```
   - Lints and formats all code in both client and common using the root config.

5. **Run tests**
   - **Unit tests:**
     ```sh
     pnpm test
     ```
   - **E2E tests:**
     ```sh
     pnpm test:e2e
     ```

## Notes
- All code in `common/` should be reusable and not depend on `client/`.
- All code in `client/` can import from `common/` using the `@common/*` alias.
- All linting, formatting, and testing is managed from the root using TurboRepo and pnpm.
- Build artifacts are output to `client/dist` and `common/dist` only.

---

For more details, see the `tests/README.md` for test-specific instructions.
