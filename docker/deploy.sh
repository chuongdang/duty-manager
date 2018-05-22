#!/bin/bash

DOCKER_PATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SRC_PATH=$(dirname "$DOCKER_PATH")

cd $DOCKER_PATH/fpm && docker build -t docker.io/chuongdang291088/clinic:fpm .
cd $DOCKER_PATH/nginx && docker build -t docker.io/chuongdang291088/clinic:nginx .

docker push docker.io/chuongdang291088/clinic:fpm
docker push docker.io/chuongdang291088/clinic:nginx

cd $SRC_PATH
tar czvf astro-vendor.tar.gz
aws s3 cp astro-vendor.tar.gz s3://nksg/source/ --profile=chuong --region=ap-southeast-1
rm astro-vendor.tar.gz

cd $DOCKER_PATH

#aws ecs register-task-definition --family astro --container-definitions \
#file:///$DOCKER_PATH/task-definitions.json \
#--profile=chuong --region=ap-southeast-1