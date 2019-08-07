FROM node:11-alpine

RUN mkdir /app
COPY ./package.json /app
WORKDIR /app
RUN npm install -g yarn
RUN yarn

CMD ./node_modules/.bin/nodemon app.js 0.0.0.0 8080

