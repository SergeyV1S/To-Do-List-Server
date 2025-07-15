ARG APPNAME="${APPNAME}" \
  PORT="${PORT}" \
  NODE_ENV="${NODE_ENV}" \
  LOCALE="${LOCALE}" \
  PRODUCTION_URL="${PRODUCTION_URL}" \
  CLIENT_BASE_URL="${CLIENT_BASE_URL}" \
  DATABASE_HOST="${DATABASE_HOST}" \
  DATABASE_PORT="${DATABASE_PORT}" \
  DATABASE_USER="${DATABASE_USER}" \
  DATABASE_PASSWORD="${DATABASE_PASSWORD}" \
  DATABASE_NAME="${DATABASE_NAME}" \
  DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}"

FROM node:20.11-alpine AS builder

WORKDIR /var/www

COPY package.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:20.11-alpine AS production

WORKDIR /var/www

COPY --from=builder /var/www/dist ./dist
COPY --from=builder /var/www/src/db/drizzle/migrations ./dist/db/drizzle/migrations
COPY --from=builder /var/www/src/db/drizzle/migrations/meta ./dist/db/drizzle/migrations/meta
COPY --from=builder /var/www/package-lock.json .
COPY package.json ./

RUN apk add --no-cache jq
RUN npm install cors@^2.8.5 dotenv@^16.3.1 drizzle-orm@0.31.0 express@^4.21.2 morgan@^1.10.0 pg@^8.12.0 uuid@^10.0.0 winston@^3.10.0 zod@^3.22.2
RUN apk del jq

ENV APPNAME="${APPNAME}" \
  PORT="${PORT}" \
  NODE_ENV="${NODE_ENV}" \
  LOCALE="${LOCALE}" \
  PRODUCTION_URL="${PRODUCTION_URL}" \
  CLIENT_BASE_URL="${CLIENT_BASE_URL}" \
  DATABASE_HOST="${DATABASE_HOST}" \
  DATABASE_PORT="${DATABASE_PORT}" \
  DATABASE_USER="${DATABASE_USER}" \
  DATABASE_PASSWORD="${DATABASE_PASSWORD}" \
  DATABASE_NAME="${DATABASE_NAME}" \
  DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}" \