# Stage 1: Build
FROM node:16.17-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma generate
RUN yarn build

# Stage 2: Install production dependencies
FROM node:16.17-alpine as prod-deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

# Stage 3: Run
FROM node:16.17-alpine

WORKDIR /app

COPY --from=prod-deps /app/package.json /app/package.json
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma

COPY wait-for-it.sh wait-for-it.sh

RUN apk add bash

EXPOSE 3000

CMD ["yarn", "start:prod"]