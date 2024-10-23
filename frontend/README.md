# Property investment platform

This project is a **Property investment platform** built with Angular and Material-UI, generated using [Angular CLI](https://github.com/angular/angular-cli) version 15.2.5. The platform allows users to browse, view, and manage real estate properties with a user-friendly interface.

## Prerequisites

Ensure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/) (v14.15.0 or later)
- [Angular CLI](https://angular.io/cli) (v15.2.5 or later)

## Getting Started

### Install Dependencies

Before running the project, install the required dependencies by running:

```bash
npm install
```

### Development Server

To start the development server, run the following command:

```bash
npm start
```

By default, the server will be available at `http://localhost:4200/`. The application will automatically reload if any source files are modified.

### Code Scaffolding

Generate new components, directives, services, and other Angular elements using the Angular CLI:

```bash
ng generate component component-name
```

You can also generate other Angular constructs such as directives, pipes, services, and modules by using the appropriate command (e.g., `ng generate directive|pipe|service|class|guard|interface|enum|module`).

## Build

To build the project for production, use:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. Use the `--configuration production` flag to optimize the build for production:

```bash
ng build --configuration production
```

## Running Unit Tests

To execute the unit tests via [Karma](https://karma-runner.github.io), run:

```bash
npm test
```

This will run the configured Karma test runner with Jasmine.

## Running End-to-End Tests

To run end-to-end (E2E) tests, you need to add a package that implements E2E testing capabilities (e.g., [Cypress](https://www.cypress.io/) or [Protractor](https://www.protractortest.org/)).

Once the testing framework is set up, you can execute the E2E tests using:

```bash
ng e2e
```

## Scripts

The following are key npm scripts available in this project:

- `npm start`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run watch`: Continuously build the project in development mode.
- `npm test`: Run unit tests.

## Further Help

For additional help with the Angular CLI, you can run:

```bash
ng help
```

Or refer to the [Angular CLI documentation](https://angular.io/cli).

## Dependencies

This project relies on several key packages:

- **Angular Core Packages**: Core framework modules including `@angular/core`, `@angular/forms`, `@angular/router`, and others.
- **Material-UI**: UI components for a modern, responsive design.
- **RxJS**: Reactive extensions for handling asynchronous data streams.
- **NestJS**: Server-side functionality through static file serving.

### Development Dependencies

- **Karma & Jasmine**: Tools for unit testing.
- **TypeScript**: For static type checking and modern JavaScript support.
- **Angular DevKit**: For building and development purposes.

## Project Structure

The main structure of the project is as follows:

```
/src
  /app
    /components     # Angular components
    /services       # Service files for business logic
    /models         # Interfaces and types
    /environments   # Environment configuration files
```

## License

This project is licensed under the MIT License.
