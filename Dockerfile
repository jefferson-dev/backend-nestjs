FROM node:18.14.2-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn

COPY . .

RUN yarn build

FROM node:18.14.2-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/env ./env
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
