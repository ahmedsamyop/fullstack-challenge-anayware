# Semester Backend

Semester Backend is a RESTful API built with `TypeScript`, `Node.js`, `Express.js`, and `MongoDB` that provides a set of endpoints for interacting with a database.

It utilizes `JSON Web Tokens (JWT)` for authentication and `bcrypt` for securely hashing passwords `zod` for validate and parse user input in applications

## Environment Variables

- Create a file `.env` to add environment variables
- To run this project, you will need to add the following environment variables to your .env file

```bash
# server configuration
NODE_ENV=dev
NODE_PORT=3005
# MongoDB configuration
DB_MONGO_USERNAME=ahmedsamyop
DB_MONGO_PASSWORD=VZdKsvavQW096B9u
DB_MONGO_NAME=semester
# hash password
BCRYPT_PAPPER_PASSWORD=my-script-password
BCRYPT_SALT_ROUNDS=10
# JWT secret
JWT_SECRET=my-script-secret-jwt

```

## USAGE

```bash
  npm install
```

```bash
  npm start
```

## Command Usage

To Install all dependencies, run the following command

```bash
  npm install
```

To build, run the following command

```bash
  npm run build
```

To Start developing , run the following command

```bash
  npm run dev
```

To Start Production , run the following command

```bash
  npm start
```

To remove folder Production (dist), run the following command

```bash
  npm run clear
```

To code formating prettier , run the following command

```bash
  npm run format
```

**Note:** `clear Script` Run Only in `Windows` command line

## Data Schema & API Endpoints

- [API_ENDPOINTS](./API_ENDPOINTS.md)
