# Revelo Tech Assessment - NestJS GraphQL API

This project is a backend API built with [NestJS](https://nestjs.com/), [GraphQL](https://graphql.org/), and [Prisma](https://www.prisma.io/). It uses Docker for environment management, with PostgreSQL as the database, and includes automated tests to ensure code quality.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/download/) (version 22 or higher)
- [npm](https://www.npmjs.com/get-npm) (Node.js package manager)

## Setup and Run

### Clone the Repository

```bash
git clone https://github.com/GleidsonLeite/revelo-tech-assessment.git
cd revelo-tech-assessment
```

### Docker Compose Setup

The application uses Docker Compose to manage services. In the `docker-compose.yml` file, the application and PostgreSQL are configured. PostgreSQL is available on port `5432`, and the application is available on port `3333`.

### Environment Variables

Create a `.env` file in the project root to configure environment variables. The database connection URL is already set in `docker-compose.yml` for the Docker environment:

```env
DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/app?schema=public
```

### Build and Run with Docker

To build and run the containers, execute the following command:

```bash
docker-compose up --build
```

- The API will be exposed on port `3333`.
- PostgreSQL will be exposed on port `5432`.

### Seed the Database

Before running the application, you should seed the database to set up initial data. After running Docker Compose, open a new terminal and execute the seed script:

```bash
npm run seed
```

This will populate the database with initial data needed for the application to run properly.

### Accessing the GraphQL API and Playground

The GraphQL API is available at the `/graphql` route. You can also use this same route to access the GraphQL Playground for testing and exploring the API.

- API and Playground URL: [http://localhost:3333/graphql](http://localhost:3333/graphql)

### Testing the Application

Before every commit, Husky will automatically run the test and linting commands. To manually test:

- Run unit and integration tests:

```bash
npm run test
npm run test:e2e
```

- Run linting:

```bash
npm run lint
```

## Project Structure

- `src/`: Contains the application source code.
  - `modules/`: Includes application modules like `makes` for managing car makes.
  - `graphql/`: Defines the GraphQL types, such as `Make` and `VehicleType`.
- `prisma/`: Contains the Prisma schema and database migrations.
- `.husky/`: Husky configuration for Git pre-commit hooks.

## Technologies Used

- **NestJS**: A Node.js framework for building scalable and robust APIs.
- **GraphQL**: A query language that makes data access and manipulation easier.
- **Prisma**: An ORM to interact with the PostgreSQL database.
- **Docker**: For containerizing the application and database.
- **Vitest**: A testing framework for running unit and integration tests.
- **Husky**: To add Git hooks and ensure all tests pass before committing.

## GraphQL Endpoints

The API includes the following resolvers:

- **GetMakeByIdResolver**: A query to fetch a car make by ID.
- **ListMakesResolver**: A query to list car makes with pagination.

Example GraphQL query for `GetMakeById`:

```graphql
query {
  getMakeById(id: 1) {
    id
    name
    vehicleTypes {
      name
    }
  }
}
```

## Contributing

1. Fork the project.
2. Create a new branch for your feature: `git checkout -b my-feature`.
3. Commit your changes: `git commit -m 'Add my feature'`.
4. Push to the branch: `git push origin my-feature`.
5. Open a pull request on GitHub.

## License

This project is under the UNLICENSED license. See the LICENSE file for more details.