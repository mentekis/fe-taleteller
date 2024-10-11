FROM node:lts-alpine3.20 as builder

WORKDIR /app

COPY package.json ./

RUN npm i -g pnpm
RUN npm i -g typescript

RUN pnpm i

RUN pnpm lint

RUN pnpm build

FROM node:lts-alpine3.20 as server

WORKDIR /app

RUN npm i -g serve

COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]

