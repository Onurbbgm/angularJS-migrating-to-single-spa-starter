FROM node:20-alpine

WORKDIR /mx6-react

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 9000

CMD node serve.js env=$REACT_ENV