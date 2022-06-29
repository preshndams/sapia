FROM node:14-alpine

WORKDIR /web

ENV PORT 6000

COPY package.json /web/package.json

RUN npm install

COPY /dist /web/dist

EXPOSE 6000

CMD ["npm", "run", "prod"]