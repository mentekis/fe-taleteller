FROM node:lts-alpine3.20 as builder

WORKDIR /app

COPY . .

RUN npm i -g pnpm
RUN npm i -g typescript

RUN pnpm i

RUN pnpm lint

RUN pnpm build

ARG SERVICE_HOST

ENV VITE_API_SERVICE_HOST=${SERVICE_HOST}

EXPOSE 3333

CMD [ "pnpm", "dev" ]

# FROM node:lts-alpine3.20 as server

# WORKDIR /app

# RUN npm i -g serve

# COPY --from=builder /app/dist /app/dist

# EXPOSE 3000

# CMD [ "serve", "-s", "dist" ]

