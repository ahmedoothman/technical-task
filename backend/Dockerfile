# Use the official Node.js image
FROM node:16.13.0

# Set the working directory
WORKDIR /backend-app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
