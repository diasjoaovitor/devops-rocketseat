FROM node:iron-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm install --omit=dev --ignore-scripts

FROM node:iron-alpine

RUN apk add --no-cache mariadb-client

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/wait-for-db.js ./wait-for-db.js
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["sh", "-c", "npm run db:wait && npm run migrations:up && npm run start"]
