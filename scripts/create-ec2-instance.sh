#!/bin/bash
KEY_PAIR=youtube-mixer-cluster
NAME=youtube-mixer
INSTANCE_TYPE=t2.micro
IMAGE_ID=ami-0fc5d935ebf8bc3bc
SECURITY_GROUP_ID=sg-0eb029c2e89aee267
AWS_PROFILE=jesus
SUBNET_ID=subnet-043f4a90729e5cf14

aws ec2 run-instances --profile $AWS_PROFILE \
    --image-id $IMAGE_ID \
    --count 1 \
    --instance-type $INSTANCE_TYPE \
    --key-name $KEY_PAIR \
    --security-group-ids $SECURITY_GROUP_ID \
    --subnet-id $SUBNET_ID \
    --associate-public-ip-address \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=youtube-mixer}]' \
    --block-device-mappings '[{"DeviceName":"/dev/xvda","Ebs":{"VolumeSize":20,"VolumeType":"gp2"}}]'
