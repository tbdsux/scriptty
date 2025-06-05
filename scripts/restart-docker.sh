#!/bin/bash

# Stop containers
docker compose down

# Remove specific laravel volumes
# We need to remove these volumes to ensure that the latest assets are built
# For some reason, it is not enough to just rebuild the containers, new assets are not picked up
docker volume rm scriptty_laravel-public-assets scriptty_laravel-storage-production

# Rebuild and start containers
docker compose up -d --build