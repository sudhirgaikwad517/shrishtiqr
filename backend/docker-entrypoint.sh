#!/bin/sh
set -e

if [ ! -f .env ]; then
  echo "Missing backend/.env — copy from .env.production.example"
  exit 1
fi

if [ ! -f vendor/autoload.php ]; then
  echo "Installing Composer dependencies..."
  composer install --no-dev --optimize-autoloader --no-interaction
fi

exec "$@"
