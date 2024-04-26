FROM node:20.11

WORKDIR /react-migration

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9000

CMD ["npm", "start"]