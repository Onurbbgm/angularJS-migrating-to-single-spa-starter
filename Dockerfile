FROM node:20

# Set the working directory for the AngularJS app
WORKDIR /angularjs-app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the working directory for the React app
WORKDIR /angularjs-app/react-migration

# Copy package.json and package-lock.json to the working directory
COPY ./react-migration/package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./react-migration/ .

RUN npm run build:dev

RUN npm install -g serve

# Install npm-run-all
RUN npm install -g concurrently

# Add scripts to package.json to start both apps
#RUN echo '{ "scripts": { "startboth": "npm-run-all --parallel start:*", "start:angular": "cd .. && npm run grunt", "start:react": "serve -p 9000 dist-local" } }' > package.json

# Expose ports for both apps
EXPOSE 8080 9000

# Start both apps
#CMD npm run startboth

CMD if [ "$MXM_REACT_ENV" = "LOCAL_DEV" ] ; then concurrently "cd .. && npm run grunt "  "serve -p 9000 dist-local"; \
    elif [ "$MXM_REACT_ENV" = "qa" ] ; then concurrently "cd .. && npm run grunt "  "serve -p 9000 dist-qa"; \
    elif [ "$MXM_REACT_ENV" = "uat" ] ; then -p concurrently "cd .. && npm run grunt "  "serve -p 9000 dist-uat" ; \
    elif [ "$MXM_REACT_ENV" = "sandbox" ] ; then concurrently "cd .. && npm run grunt "  "serve -p 9000 dist-sandbox"; \
    else concurrently "cd .. && npm run grunt "  "serve -p 9000 dist" ; fi


#OLD VERSION
# # Use an official Node runtime as the base image
# FROM node:20 as angular

# WORKDIR /angularjs-app

# COPY package*.json ./

# RUN npm install

# COPY . .

# #react setup
# FROM node:20-alpine as react
# # Set the working directory in the container to /app
# WORKDIR /angularjs-app/react-migration

# # # Copy package.json and package-lock.json to the working directory
# COPY ./react-migration/package*.json ./react-migration

# # # Install the application dependencies
# RUN npm install

# # # Copy the rest of the application code to the working directory
# COPY ./react-migration/ .

# RUN npm run build:dev

# RUN npm run build:prod

# # # Use a lightweight version of Node.js as the final base image

# # # Set the working directory in the container to /app
# WORKDIR /angularjs-app/react-migration

# # # Copy the build artifacts from the previous stage to the working directory
# COPY --from=0 /angularjs-app/react-migration/dist-local /dist-local
# COPY --from=0 /angularjs-app/react-migration/dist-prod /dist-prod

# # # Install a server to serve the application
# RUN npm install -g serve
# # #RUN npm i -S serve

# # # Expose port 5000 for the applicatio

# # # Define environment variable
# # ENV MXM_REACT_ENV=LOCAL_DEV

# # RUN serve -p 9000 react-migration/dist-local

# # # Run server.js when the container launches, using the environment variable
# # RUN if [ "$MXM_REACT_ENV" = "LOCAL_DEV" ] ; then serve -p 9000 react-migration/dist-local ; \
# #     elif [ "$MXM_REACT_ENV" = "qa" ] ; then serve -p 9000 react-migration/dist-qa ; \
# #     elif [ "$MXM_REACT_ENV" = "uat" ] ; then serve -p 9000 react-migration/dist-uat ; \
# #     elif [ "$MXM_REACT_ENV" = "sandbox" ] ; then serve -p 9000 react-migration/dist-sandbox ; \
# #     else npm run serve -p 9000 react-migration/dist-prod ; fi

# FROM node:20-alpine

# WORKDIR /angularjs-app

# COPY --from=angular /angularjs-app .
# COPY --from=react /angularjs-app/react-migration/dist-local /dist-local
# COPY --from=react /angularjs-app/react-migration/dist-prod /dist-prod

# EXPOSE 9000
# EXPOSE 8080

# CMD npm start
