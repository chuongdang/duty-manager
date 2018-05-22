#!/bin/bash

action=${1:-up}
DOCKER_PATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SRC_PATH=$(dirname "$DOCKER_PATH")

docker_compose_file=$DOCKER_PATH'/docker-compose.yml'
sed "s@%src-path%@$SRC_PATH@g; s@%docker-path%@$DOCKER_PATH@g" $DOCKER_PATH'/docker-compose.template' > $docker_compose_file

if [ $action = "up" ]; then
	docker-compose -f $docker_compose_file up -d
elif [ $action = "down" ]; then
	docker-compose -f $docker_compose_file down
fi

rm $docker_compose_file

rsync -avz $SRC_PATH/* rsync://localhost:10873/volume/astro
