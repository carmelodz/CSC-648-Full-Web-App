# Stage 1: Build
FROM node:16.17-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Serve with 'serve'
FROM node:16.17-alpine

WORKDIR /app

RUN yarn global add serve

COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]