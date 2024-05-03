FROM node:20-alpine

WORKDIR /mx6-react

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

COPY /mx6-react/dist ./dist

RUN npm install -g serve

EXPOSE 9000

CMD npm run serve