# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the application
RUN npm run build

# Install `serve` to serve the production build
RUN npm install -g serve

# Expose the port
EXPOSE 8080

# Start the application
CMD ["serve", "-s", "build", "-l", "8080"]
