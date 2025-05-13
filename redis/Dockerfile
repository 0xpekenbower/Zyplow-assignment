ARG REDIS_ENV=prod

FROM redis/redis-stack:latest AS dev
FROM redis/redis-stack-server:latest AS prod

FROM ${REDIS_ENV:-prod}