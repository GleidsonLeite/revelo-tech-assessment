# Changelog

## [0.0.1] - 2024-10-09

### Added
- Initial release of the NestJS GraphQL API.
- Docker configuration with PostgreSQL for local development.
- GraphQL API with resolvers:
  - `GetMakeByIdResolver`: Fetches car make details by ID.
  - `ListMakesResolver`: Lists car makes with pagination support.
- Prisma ORM for database interaction with PostgreSQL.
- GraphQL Playground available at `/graphql` for testing and exploration.
- Automated testing with Vitest for unit and integration tests.
- Pre-commit hooks using Husky to run tests and linting before commits.
