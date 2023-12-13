FROM node:16-alpine
MAINTAINER Jesus Alvan <jesusalvan2010@gmail.com>

WORKDIR /usr/src/app/back/ms-youtube-mixer

COPY ["package.json", "tsconfig.json", ".env", "./"]
COPY ./src ./src

RUN apk update && apk add --no-cache ffmpeg
RUN npm install

EXPOSE 3001

CMD npm run dev
