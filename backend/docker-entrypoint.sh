#!/bin/sh
set -e

if [ ! -f .env ]; then
  echo "Missing backend/.env — copy from .env.example"
  exit 1
fi

php artisan config:clear
php artisan migrate --force
php artisan config:cache
php artisan route:cache

exec "$@"
