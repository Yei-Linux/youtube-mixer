FROM node:16-alpine

WORKDIR /usr/src/app/back/ms-youtube-mixer

COPY ["package.json", "tsconfig.json", ".env", "./"]
COPY ./src ./src

RUN npm install
CMD npm run dev
