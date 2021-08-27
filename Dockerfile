### Development
# Base image
FROM node:14-alpine3.14 AS base
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN yarn install
# Bundle app source
COPY . .
# Run script pre-step
RUN chmod +x /app/entrypoint.sh

### Production
FROM base AS production

ENV NODE_PATH=./build

RUN yarn build