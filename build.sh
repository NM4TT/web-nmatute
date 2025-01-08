#!/bin/bash

# Exit on any error
set -e

DEBUG_MODE=false
if [[ "$1" == "--debug" || "$1" == "-d" ]]; then
  DEBUG_MODE=true
  echo "Debug mode enabled: Using docker-compose.dev.yaml"
fi

# Backend service setup
echo "Starting backend service..."
if [ "$DEBUG_MODE" = true ]; then
  docker-compose -f "./backend/docker-compose.yaml" -f "./backend/docker-compose.dev.yaml" up -d --build --force-recreate
else
  docker-compose -f "./backend/docker-compose.yaml" up -d --build --force-recreate
fi

# Check if the backend is up and running
BACKEND_URL="http://localhost:4000/liveness"

while ! curl -s $BACKEND_URL > /dev/null; do
  echo "Backend not ready yet. Retrying in 2 seconds..."
  sleep 2
done

echo "backend service up"

# Frontend service setup
echo "Starting frontend service..."
if [ "$DEBUG_MODE" = true ]; then
  docker-compose -f "./frontend/docker-compose.yaml" -f "./frontend/docker-compose.dev.yaml" up --build --force-recreate
else
  docker-compose -f "./frontend/docker-compose.yaml" up --build --force-recreate
fi

echo "frontend service up"
