FROM node:20-alpine AS build

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start"]