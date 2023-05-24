
# Safety Hub Backend

## :warning: Requirement

- [Docker](https://docs.docker.com/get-docker/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- [Node >= 16](https://github.com/nvm-sh/nvm)
- [Yarn](https://yarnpkg.com/)
- Optional [direnv](https://direnv.net/)

## :checkered_flag: Quick-Start
### Developement environment

```sh
#.envrc

# MYSQL Configuration
export DB_ROOT_PASSWORD=example
export DB_NAME=dev_db
export DB_USER=dev_user
export DB_PASSWORD=dev_password

export DATABASE_URL=mysql://root:${DB_ROOT_PASSWORD}@localhost:3306/${DB_NAME}

# Redis Configuration
export REDIS_HOST=127.0.0.1
export REDIS_PORT=6379
export REDIS_PASSWORD="redispassword"
export REDIS_URL=redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}
export SESSION_SECRET="okcmaseccret"
```

execute the command `direnv allow` if you have it.

Lauch mysql database for the test (without volume)
```sh
docker-compose -f docker-compose.dev.yaml up -d

# Generate prisma client
 npx prisma generate

# Seed for db
npx prisma db seed
```

Generate new ressource in NestJS:
```sh
npx nest generate resource
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

Once the api is launched you can go to the `/api`
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
