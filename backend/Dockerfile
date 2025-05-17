# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all files from the current directory to the working directory
COPY . .

RUN npm run build
RUN ls -l

COPY . .

# Development stage
FROM builder AS development
# Set NODE_ENV to development
ENV NODE_ENV=development

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application(in development)
CMD ["npm", "run", "dev"]
