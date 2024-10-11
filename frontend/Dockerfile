FROM node:22-alpine AS base

WORKDIR /app


FROM base AS service

# Copy app source
COPY public/ src/ package-lock.json package.json yarn.lock /app

RUN yarn

# Set startup command
CMD ["yarn", "start"]

