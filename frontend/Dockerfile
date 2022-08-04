# Stage 1: build
FROM node:16 AS development

WORKDIR /keno/frontend/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000