#!/bin/bash
source ./env_variables.sh
PROFILE_NAME=youtube-mixer

ecs-cli compose --project-name $PROFILE_NAME \
    --file ecs-compose.yml --ecs-params ecs-params.yml \
    --debug service up  \
    --deployment-max-percent 100 --deployment-min-healthy-percent 0 \
    --region $AWS_DEFAULT_REGION --ecs-profile $PROFILE_NAME \
    --cluster-config $PROFILE_NAME --create-log-groups \
    --timeout 10
    