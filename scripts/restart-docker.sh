#!/bin/bash

# Remove specific volumes
docker volume rm scriptty_laravel-public-assets scriptty_laravel-storage-production

# Rebuild and start containers
docker compose up -d --build