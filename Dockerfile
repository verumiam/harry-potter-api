FROM node:18-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN npm cache clean --force
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:18-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/pnpm-lock.yaml ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

RUN npm install -g pnpm

CMD ["pnpm", "start"]
