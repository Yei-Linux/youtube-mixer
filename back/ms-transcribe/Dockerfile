FROM python:3.11

WORKDIR /usr/src/app

COPY ["./back/ms-transcribe/requirements.txt", "./"]
COPY ./back/ms-transcribe/app ./app

RUN pip install --no-cache-dir --upgrade -r requirements.txt
#CMD python ./app/main.py