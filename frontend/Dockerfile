FROM node:18-alpine

WORKDIR /app/react-app

COPY /fitFever/package-lock.json ./

COPY /fitFever/package.json /fitFever/yarn.lock ./

RUN yarn install

COPY /fitFever ./

EXPOSE 3000

RUN npm run build

CMD ["npm","run","preview"]