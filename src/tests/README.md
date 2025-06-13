# Testing

This project uses Jest for both unit and end-to-end (integration) testing. All test files are located in the `src/tests` directory.

## Directory Structure

```
src/tests/
├── unit/                  # Unit tests (e.g., app.controller.spec.ts, users.controller.spec.ts, users.service.spec.ts)
├── integration/           # End-to-end (e2e) tests (e.g., app.e2e-spec.ts, users.e2e-spec.ts)
├── jest-e2e.json          # Jest configuration for e2e tests
└── README.md              # This file
```

## Unit Tests

Unit tests are located in `src/tests/unit` and have a `.spec.ts` extension.

To run unit tests:

```bash
pnpm test:unit
```

This will run all files matching the pattern `src/tests/unit/*.spec.ts`.

## End-to-End (Integration) Tests

End-to-end tests are located in `src/tests/integration` and have a `.e2e-spec.ts` extension.

To run e2e tests:

```bash
pnpm test:e2e
```

This will run all files matching the pattern `src/tests/integration/*.e2e-spec.ts`.

## Running All Tests

To run all tests (unit and e2e):

```bash
pnpm test
```

## Notes

- All test scripts automatically load environment variables from your `.env` file via `dotenv-cli`.
- Test scripts are defined in `package.json` and orchestrated with Turbo for fast execution.
