# Tests Directory

This directory contains all unit and integration (e2e) tests for the monorepo.

## Structure

```
tests/
  unit/           # Unit tests for client and common code
    *.spec.ts
  integration/    # End-to-end (e2e) tests for the application
    *.e2e-spec.ts
  jest-e2e.json   # Jest config for e2e tests
  README.md       # (this file)
```

## Running Tests

From the root of the repository:

- **Unit tests:**
  ```sh
  pnpm test
  ```
  - Runs all unit tests in `tests/unit` using the root Jest config.

- **E2E tests:**
  ```sh
  pnpm test:e2e
  ```
  - Runs all integration tests in `tests/integration` using `tests/jest-e2e.json`.

## Test Aliases
- Use `@client/*` to import from the client package (e.g., `@client/app.module`).
- Use `@common/*` to import from the common package (e.g., `@common/db`).
- These aliases are configured in the Jest configs for both unit and e2e tests.

## Notes
- All tests are run from the root using pnpm and TurboRepo.
- You can add new test files to `tests/unit` or `tests/integration` as needed.
- If you add new aliases or move files, update the Jest config accordingly.
