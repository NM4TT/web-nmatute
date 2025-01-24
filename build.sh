#!/bin/bash

# Exit on any error
set -e

DEBUG_MODE=false
if [[ "$1" == "--debug" || "$1" == "-d" ]]; then
  DEBUG_MODE=true
  echo "Debug mode enabled: Using docker-compose.dev.yaml"
fi

docker container prune -f && docker image prune -a -f

if [ "$DEBUG_MODE" = true ]; then
  docker-compose -f "./docker-compose.yaml" -f "./docker-compose.dev.yaml" up -d --build --force-recreate
else
  docker-compose -f "./docker-compose.yaml" up -d --build --force-recreate
fi
