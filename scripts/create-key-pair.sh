#!/bin/bash
PROJECT_NAME=youtube-mixer-cluster
AWS_PROFILE=jesus

aws ec2 create-key-pair --profile $AWS_PROFILE --key-name $PROJECT_NAME \
 --query 'KeyMaterial' --output text > ~/.ssh/$PROJECT_NAME.pem