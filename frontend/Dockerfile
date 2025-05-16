ARG FRONTEND_ENV=prod
FROM node:23-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps


FROM base AS dev
CMD ["npm", "run", "dev"]

FROM base AS prod
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]

FROM ${FRONTEND_ENV:-prod} AS final