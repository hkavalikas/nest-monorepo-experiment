# Testing

This project contains both unit tests and integration tests.

## Unit Tests

Unit tests are located in the `src` directory alongside the source files they test, with a `.spec.ts` extension.

To run unit tests:

```bash
npm test
```

This will run all files matching the pattern `*.spec.ts` in the `src` directory.

## Integration Tests

Integration tests are located in the `test` directory with a `.e2e-spec.ts` extension.

To run integration tests:

```bash
npm test -- --config ./test/jest-e2e.json
```

This will run all files matching the pattern `.e2e-spec.ts` in the `test` directory.

## Test Coverage

To generate a test coverage report:

```bash
npm test -- --coverage
```

The coverage report will be generated in the `coverage` directory.

## Running Specific Tests

To run a specific test file:

```bash
# For unit tests
npm test -- src/users/users.controller.spec.ts

# For integration tests
npm test -- --config ./test/jest-e2e.json test/users.e2e-spec.ts
```

To run tests with a specific name pattern:

```bash
npm test -- -t "should create a new user"
```