# Use official Node.js image as the base image
FROM node:20
WORKDIR /front-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
