FROM node:16-alpine

WORKDIR /usr/src/app

COPY ["./back/ms-youtube-mixer/package.json", "./back/ms-youtube-mixer/tsconfig.json", "./back/ms-youtube-mixer/.env", "./"]
COPY ./back/ms-youtube-mixer/src ./src

RUN npm install
#CMD npm run dev