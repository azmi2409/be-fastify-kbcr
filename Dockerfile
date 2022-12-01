FROM node:18-alpine

# Create app directory
WORKDIR /kbcr

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source

COPY . .

RUN npm run generate

EXPOSE 3000

CMD [ "npm", "start" ]