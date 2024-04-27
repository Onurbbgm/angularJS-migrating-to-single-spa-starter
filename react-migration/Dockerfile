# Use an official Node runtime as the base image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build:prod

# Use a lightweight version of Node.js as the final base image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the build artifacts from the previous stage to the working directory
COPY --from=0 /app/dist ./dist

# Install a server to serve the application
RUN npm install -g serve
#RUN npm i -S serve

# Expose port 5000 for the application
EXPOSE 3000

# Start the application
CMD ["serve", "dist"]
