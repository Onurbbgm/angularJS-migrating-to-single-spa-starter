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

# Use an ARG to allow specifying the environment at build time
ARG ENV

# Use a RUN command with a shell script to conditionally run different commands based on the ARG value
RUN if [ "$ENV" = "qa" ] ; then npm run build:qa; \
    elif [ "$ENV" = "uat" ] ; then npm run build:uat; \
    elif [ "$ENV" = "sandbox" ] ; then npm run build:sandbox; \
    elif [ "$ENV" = "prod" ] ; then npm run build:prod; \
    else echo "Please provide an environment as a build arg (e.g., --build-arg ENV=qa)"; exit 1; fi

# Build the application
#RUN npm run build:prod

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
EXPOSE 9000

# Start the application
CMD ["serve", "-p", "9000", "dist"]
