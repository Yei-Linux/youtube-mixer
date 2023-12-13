#!/bin/bash
AWS_PROFILE=jesus
AWS_ECS_URI_PREFFIX=public.ecr.aws
AWS_ECR_URI_TRANSCRIBE=$AWS_ECS_URI_PREFFIX/u1h6l3v5/ms-transcribe
AWS_ECR_URI_MIXER=$AWS_ECS_URI_PREFFIX/u1h6l3v5/ms-youtube-mixer

docker tag youtube-mixer-ms-transcribe:latest $AWS_ECR_URI_TRANSCRIBE
docker tag youtube-mixer-ms-youtube-mixer:latest $AWS_ECR_URI_MIXER

aws ecr-public get-login-password --profile $AWS_PROFILE | docker login --username AWS --password-stdin $AWS_ECS_URI_PREFFIX

docker push $AWS_ECR_URI_TRANSCRIBE
docker push $AWS_ECR_URI_MIXER