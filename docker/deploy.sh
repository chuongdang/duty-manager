#!/bin/bash

DOCKER_PATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SRC_PATH=$(dirname "$DOCKER_PATH")

cd $DOCKER_PATH/fpm && docker build -t docker.io/chuongdang291088/clinic:fpm .
cd $DOCKER_PATH/nginx && docker build -t docker.io/chuongdang291088/clinic:nginx .

docker push docker.io/chuongdang291088/clinic:fpm
docker push docker.io/chuongdang291088/clinic:nginx