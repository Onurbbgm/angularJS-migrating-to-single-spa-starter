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

CMD if [ "$MXM_REACT_ENV" = "dist-local" ] ; then concurrently "cd .. && npm run grunt "  "serve -p 9000 $MXM_REACT_ENV"; \
    elif [ "$MXM_REACT_ENV" = "qa" ] ; then concurrently "cd .. && npm run grunt "  "serve -p 9000 dist-qa"; \
    elif [ "$MXM_REACT_ENV" = "uat" ] ; then -p concurrently "cd .. && npm run grunt "  "serve -p 9000 dist-uat" ; \
    elif [ "$MXM_REACT_ENV" = "sandbox" ] ; then concurrently "cd .. && npm run grunt "  "serve -p 9000 dist-sandbox"; \
    else concurrently "cd .. && npm run grunt "  "serve -p 9000 dist" ; fi

