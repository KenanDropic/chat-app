# Specify Node Version and Image
# Name Image development
FROM node:16 AS development

# Specify Working directory inside container
WORKDIR /keno/src/app

# Copy package-lock.json and package.json from host to inside container working directory
COPY package*.json ./

# Install deps inside container
RUN npm install

# Bunde App Sources
COPY . .

RUN npm run build

EXPOSE 5000


################
## PRODUCTION ##
################

# Build another image named production
FROM node:16 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Specify working dir
WORKDIR /keno/src/app

# Copy package-lock.json and package.json from host to inside container working directory
COPY --from=development /keno/src/app .

# Install deps inside container
RUN npm install

EXPOSE 8080

#run app
CMD ["node","dist/main"]