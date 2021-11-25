FROM node:12.14-alpine

ARG REACT_APP_BACKEND_URL

WORKDIR /code

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build
