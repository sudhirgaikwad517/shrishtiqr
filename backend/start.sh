#!/bin/sh
set -e

cd /var/www/html

if [ ! -f vendor/autoload.php ]; then
  echo "Installing Composer dependencies..."
  composer install --no-dev --optimize-autoloader --no-interaction
fi

echo "Starting Laravel on port 8000..."
exec php artisan serve --host=0.0.0.0 --port=8000
