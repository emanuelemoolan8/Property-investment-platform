# Property Investment Platform

This project is a **Property Investment Platform** built with **Angular** for the frontend and **NestJS** for the backend. The platform allows users to browse, view, and manage real estate properties through a user-friendly interface and includes features for both **investors** and **property managers**.

## Prerequisites

Before getting started, ensure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/) (v14.15.0 or later)
- [Angular CLI](https://angular.io/cli) (v15.2.5 or later)

## Project Structure

```
/frontend     # Angular frontend code
/backend      # NestJS backend code
/docker-compose.yml  # Docker setup for full application
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/emanuelemoolan8/property-investment-platform.git
cd property-investment-platform
```

### 2. Install Dependencies

Navigate to each directory and install the necessary dependencies:

For the frontend:

```bash
cd frontend
npm install
```

For the backend:

```bash
cd backend
npm install
```

### 3. Run the Application

#### Frontend (Angular)

To start the frontend development server:

```bash
cd frontend
npm start
```

By default, the frontend will be available at `http://localhost:4200/`.

#### Backend (NestJS)

To start the backend server:

```bash
cd backend
npm run start
```

The backend will run by default at `http://localhost:3000/`.

### 4. Run with Docker Compose

To run the entire application (frontend + backend + database) using Docker Compose, ensure Docker is installed, then run:

```bash
docker-compose up
```

This will set up and start both the frontend and backend, as well as a PostgreSQL database.

## Build

### Frontend

To build the Angular frontend for production:

```bash
cd frontend
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Backend

To build the backend for production:

```bash
cd backend
npm run build
```

## Running Tests

### Frontend Tests

Run unit tests for the Angular frontend using Karma and Jasmine:

```bash
cd frontend
npm test
```

### Backend Tests

Run unit and E2E tests for the NestJS backend:

```bash
cd backend
npm run test
npm run test:e2e
```

## Docker Deployment

To deploy the full application (frontend, backend, and PostgreSQL) using Docker, follow these steps:

1. Ensure Docker is installed.
2. Build the Docker images:
   ```bash
   docker-compose build
   ```
3. Run the containers:
   ```bash
   docker-compose up
   ```

By default:

- Frontend: `http://localhost:4200/`
- Backend: `http://localhost:3000/`

## Further Help

### Angular

For more Angular CLI commands, run:

```bash
ng help
```

Or visit the [Angular CLI documentation](https://angular.io/cli).

### NestJS

For NestJS documentation, visit [NestJS Official Docs](https://docs.nestjs.com/).
