#!/bin/bash
KEY_PAIR=youtube-mixer-cluster
PROJECT_NAME=youtube-mixer-cluster
CLUSTER_NAME=youtube-mixer-cluster

PROFILE_NAME=youtube-mixer
INSTANCE_TYPE=t3.medium
INSTANCE_NUMBER=2

ecs-cli up \
    --keypair $KEY_PAIR  \
    --capability-iam \
    --size $INSTANCE_NUMBER \
    --instance-type $INSTANCE_TYPE \
    --tags project=$PROJECT_NAME,owner=jesus \
    --cluster-config $PROFILE_NAME \
    --ecs-profile $PROFILE_NAME \
    --force
