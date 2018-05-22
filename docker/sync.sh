#!/bin/bash

DOCKER_PATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SRC_PATH=$(dirname "$DOCKER_PATH")

fswatch -or $SRC_PATH | xargs -n1 -I{} rsync -avz --exclude=.idea --exclude=.git $SRC_PATH/* rsync://localhost:10873/volume/astro