FROM python:3.11

WORKDIR /usr/src/app/back/ms-transcribe

COPY ["requirements.txt", "./"]
COPY ./app ./app

RUN apt-get update && apt-get install -y ffmpeg
RUN pip install -r requirements.txt
CMD python ./app/main.py