FROM node:16.13.0

WORKDIR /backend-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
