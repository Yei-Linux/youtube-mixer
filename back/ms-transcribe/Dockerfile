FROM python:3.11
MAINTAINER Jesus Alvan <jesusalvan2010@gmail.com>

WORKDIR /usr/src/app/back/ms-transcribe

COPY ["requirements.txt", "./"]
COPY ./app ./app

RUN apt-get update && apt-get install -y ffmpeg
RUN pip install -r requirements.txt

EXPOSE 8081

CMD python ./app/main.py