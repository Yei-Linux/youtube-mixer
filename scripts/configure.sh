#!/bin/bash
source ./env_variables.sh

set -e
PROFILE_NAME=youtube-mixer
CLUSTER_NAME=youtube-mixer-cluster
LAUNCH_TYPE=EC2

ecs-cli configure profile --profile-name "$PROFILE_NAME" --access-key "$AWS_ACCESS_KEY_ID" --secret-key "$AWS_SECRET_ACCESS_KEY"
ecs-cli configure --cluster "$CLUSTER_NAME" --default-launch-type "$LAUNCH_TYPE" --region "$AWS_DEFAULT_REGION" --config-name "$PROFILE_NAME"