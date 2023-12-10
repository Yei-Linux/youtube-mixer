FROM node:16-alpine

WORKDIR /usr/src/app/back/ms-youtube-mixer

COPY ["package.json", "tsconfig.json", ".env", "./"]
COPY ./src ./src

RUN apk update && apk add --no-cache ffmpeg
RUN npm install
CMD npm run dev
