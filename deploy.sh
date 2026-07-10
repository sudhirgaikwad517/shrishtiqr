#!/bin/bash
set -e

echo "==> Building frontend..."
docker build -f frontend/Dockerfile.build \
  --build-arg VITE_API_BASE_URL= \
  --build-arg VITE_PUBLIC_URL= \
  -t shrishti-frontend-build ./frontend

docker rm -f shrishti-frontend-tmp 2>/dev/null || true
docker create --name shrishti-frontend-tmp shrishti-frontend-build
rm -rf frontend/dist
docker cp shrishti-frontend-tmp:/app/dist ./frontend/dist
docker rm shrishti-frontend-tmp

if [ ! -f frontend/dist/index.html ]; then
  echo "ERROR: frontend build failed — frontend/dist/index.html is missing"
  exit 1
fi

echo "==> Frontend build OK"
echo "==> Starting containers..."
docker compose build --no-cache backend
docker compose up -d --force-recreate

echo "==> Waiting for backend..."
sleep 5

if ! docker compose ps backend | grep -q "Up"; then
  echo "ERROR: backend container is not running. Logs:"
  docker compose logs backend --tail 40
  exit 1
fi

echo "==> Installing backend dependencies..."
docker compose exec -T backend composer install --no-dev --optimize-autoloader --no-interaction

echo "==> Running migrations..."
docker compose exec -T backend php artisan migrate --force
docker compose exec -T backend php artisan config:cache
docker compose exec -T backend php artisan route:cache

echo "==> Generating APP_KEY if missing..."
docker compose exec -T backend sh -lc 'grep -q "^APP_KEY=base64:" .env || php artisan key:generate --force'

echo "==> Seeding database (first deploy only, safe to re-run)..."
docker compose exec -T backend php artisan db:seed --force || true

echo "==> Done!"
echo "Site: check PUBLIC_PAGE_URL in backend/.env"
