# TweetApp

## Install prerequisites

- Node.js (18.x or newer)
  - See <https://app.path.progate.com/tasks/PuSZdMDZJY_cksKGNxs4b/preview>
- Puppeteer
  - See <https://app.path.progate.com/tasks/CwBFxQbIm54hr-bxtmMn9/preview>
- MySQL (8.x or newer)
  - See <https://app.path.progate.com/tasks/sQ4PifQLeD6eHeTiJ0i5i/preview>

## Setup

### 1. Rename the file name of `.env.sample` to `.env`

Use the `.env` file to set the environment variables for the development environment.

Be careful not to publish the `.env` file, such as on GitHub, as it contains login information.

※ In the initial state, the `.env` file is registered in the `.gitignore` file so that it is not included in the commit, so you can develop without worrying about it.

First, let's rename the file name of `.env.sample` to `.env`.

The contents are as follows:

```text
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# edit these variables
MYSQL_USER=""
MYSQL_PASSWORD=""

# Don't edit these variables
MYSQL_HOST="localhost"
MYSQL_PORT=3306
MYSQL_DB="tweet_app"
DATABASE_URL="mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}"
```

### 2. Enter the username and password created for MySQL in `MYSQL_USER` and `MYSQL_PASSWORD` in the `.env` file

Add and save the created MySQL username and password to the `.env` file.

```text
# Example
MYSQL_USER="ninjawanko"
MYSQL_PASSWORD="password"
```

### 3. Rename the file name of `.env.test.sample` to `.env.test`

Environment variables for the test environment are managed in a file called `.env.test`.

First, let's rename the file name of `.env.test.sample` to `.env.test`.

### 4. Enter the username and password created for MySQL in `MYSQL_USER` and `MYSQL_PASSWORD` in the `.env.test` file

As before, add and save the created MySQL username and password to the `.env.test` file.

```text
# Example
MYSQL_USER="ninjawanko"
MYSQL_PASSWORD="password"
```

## Start the server and access it from the browser

Once the database settings are configured, let's execute the following to start the server.

### 1. Package Installation

Install the necessary packages.

```terminal
npm clean-install
```

### 2. Database Migration

Reflect the project's database information into the local database.

```terminal
npm run db:migrate
```

After execution, you can log into MySQL and verify that the database and tables have been created.

```terminal
mysql -u <username> -p
```

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| tweet_app          |
+--------------------+
```

```sql
mysql> use tweet_app;
mysql> show tables;
+---------------------+
| Tables_in_tweet_app |
+---------------------+
| _prisma_migrations  |
| likes               |
| posts               |
| users               |
+---------------------+
```

The test database will be created at the time of test execution.

### 3. Inserting Initial Data into the Database

The created tables do not contain any data yet. Let's insert the pre-prepared initial data for development.

This kind of data is referred to as `seed data`.

```terminal
npm run db:seed

> tweet_app@1.0.0 db:seed
> ts-node --transpile-only -r tsconfig-paths/register --files src/db/seed/development.ts

successfully inserted records of 5 to users table
successfully inserted records of 7 to posts table
successfully inserted records of 18 to likes table
```

### 4. Start the Server

Let's start the server.

```terminal
npm run watch
```

You can view the web page by accessing the following URL.

`http://localhost:8000/`

You can stop the server that you started with `Ctrl + c`.

※ You can reset the database to its initial state with the `npm run db:reset` command. Execute it whenever you want to reset. After resetting, the data will be emptied, so please re-insert the data using `npm run db:seed` etc.

※ For server startup, we are using `npm run watch` as a development command. This automatically detects code changes and restarts the server. If you just want to start the server, you can also use `npm start`. In that case, don't forget to restart the server after making code changes. `npm start` is often used to start the server in a production environment.

#### Check the login method

In the development environment, you can log in using the initial user data. The initial data is generated when you execute `npm run db:seed`.

Here's the login information:

- Email address: `ninja@progate.com`
- Password: `password`

The users created with the initial data are described in `src/db/seed/development.ts`. All user passwords are `password`. When logging in with other users, please use the email addresses described in `src/db/seed/development.ts` accordingly.

※ While it is possible to log in by creating new users, all data will be reset when executing `npm run db:reset`.


## Other Commands

npm command list. call `npm run [command]`. for example:

```:console
npm run test:e2e
```

will run all tests in this project:

- `test:e2e`: run e2e test,
- `watch`: start development mode,
- `lint:check`: check code style by eslint,
- `lint:fix`: check code style by eslint with auto fix,
- `format:check`: check format by prettier,
- `format:fix`: check format by prettier with auto fix,
- `start`: start production mode
