### Development
# Base image
FROM node:16.13.2-slim AS base
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package.json ./
RUN yarn install && yarn cache clean
RUN npm install -g npm@8.4.0
# Bundle app source
COPY . .
# Run script pre-step
RUN chmod +x /app/entrypoint.sh

### Production
FROM base AS production

ENV NODE_PATH=./build

RUN yarn build