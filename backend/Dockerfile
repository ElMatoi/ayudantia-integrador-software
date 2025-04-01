FROM node:16-alpine

WORKDIR /usr/src/backend

COPY package.json package-lock.json ./


RUN npm install --legacy-peer-deps


COPY . .


EXPOSE 3000


CMD ["npm", "start"]