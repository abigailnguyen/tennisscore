FROM node:alpine@sha256:3b4e5fe02bb50e5b16f0595a0ec5a67474c065dec19cc4f31aaa0b4dab65e563

WORKDIR /app

COPY package*.json .

RUN npm install

USER node