# Testing

This project contains both unit tests and integration tests, all located in the `src/tests` directory.

## Directory Structure

```
src/tests/
├── unit/                  # Unit tests
│   ├── app.controller.spec.ts
│   ├── users.controller.spec.ts
│   └── users.service.spec.ts
├── integration/           # Integration tests
│   ├── app.e2e-spec.ts
│   └── users.e2e-spec.ts
├── jest-e2e.json          # Jest configuration for integration tests
└── README.md              # This file
```

## Unit Tests

Unit tests are located in the `src/tests/unit` directory with a `.spec.ts` extension.

To run unit tests:

```bash
npm test:unit
```

This will run all files matching the pattern `tests/unit/*.spec.ts` in the `src` directory.

## Integration Tests

Integration tests are located in the `src/tests/integration` directory with a `.e2e-spec.ts` extension.

To run integration tests:

```bash
npm test:e2e
```

This will run all files matching the pattern `.e2e-spec.ts` in the `src/tests/integration` directory.

## Running All Tests

To run all tests (both unit and integration) with turbo for faster execution:

```bash
npm test
```

Turbo will cache test results for faster subsequent runs.

## Test Coverage

To generate a test coverage report:

```bash
npm test:unit -- --coverage
```

The coverage report will be generated in the `coverage` directory.

## Running Specific Tests

To run a specific test file:

```bash
# For unit tests
npm test:unit -- src/tests/unit/users.controller.spec.ts

# For integration tests
npm test:e2e -- src/tests/integration/users.e2e-spec.ts
```

To run tests with a specific name pattern:

```bash
npm test:unit -- -t "should create a new user"
```

## ESLint and Unbound Methods

To avoid ESLint errors related to unbound methods, we use one of these approaches:

1. Store the method reference in a variable before using it in expect statements:

```typescript
const createFn = mockUsersRepository.create;
expect(createFn).toHaveBeenCalledWith(createUserDto);
```

2. Use arrow functions to capture the method:

```typescript
expect(() => mockUsersRepository.create).toHaveBeenCalledWith(createUserDto);
```

3. Add a comment to disable the ESLint rule for a specific line:

```typescript
// eslint-disable-next-line @typescript-eslint/unbound-method
expect(mockUsersRepository.create).toHaveBeenCalledWith(createUserDto);
```