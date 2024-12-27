# Use official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /front-app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port your application will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
