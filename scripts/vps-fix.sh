#!/bin/bash
# Run on VPS: bash scripts/vps-fix.sh
set -e

cd "$(dirname "$0")/.."
echo "==> Project: $(pwd)"

echo "==> Git pull..."
git pull origin main

echo "==> Remove old files that cause restart loop..."
rm -f backend/database/migrations/0001_01_01_000004_create_manufacturing_units_table.php
rm -f backend/docker-entrypoint.sh

echo "==> Fix migrations table (if manufacturing_units already exists)..."
docker compose up -d db
sleep 3
docker compose exec -T db psql -U "${DB_USERNAME:-shrishti_user}" -d "${DB_DATABASE:-shrishti_dairy}" <<'SQL'
INSERT INTO migrations (migration, batch)
SELECT '0001_01_01_000000_create_users_table', 1
WHERE NOT EXISTS (SELECT 1 FROM migrations WHERE migration = '0001_01_01_000000_create_users_table');

INSERT INTO migrations (migration, batch)
SELECT '0001_01_01_000001_create_cache_table', 1
WHERE NOT EXISTS (SELECT 1 FROM migrations WHERE migration = '0001_01_01_000001_create_cache_table');

INSERT INTO migrations (migration, batch)
SELECT '0001_01_01_000002_create_jobs_table', 1
WHERE NOT EXISTS (SELECT 1 FROM migrations WHERE migration = '0001_01_01_000002_create_jobs_table');

INSERT INTO migrations (migration, batch)
SELECT '0001_01_01_000003_create_manufacturing_units_table', 1
WHERE NOT EXISTS (SELECT 1 FROM migrations WHERE migration = '0001_01_01_000003_create_manufacturing_units_table');
SQL

echo "==> Rebuild backend image (no cache)..."
docker compose down
docker rmi shrishtiqr-backend 2>/dev/null || true
docker compose build --no-cache backend
docker compose up -d --force-recreate

echo "==> Wait for backend..."
sleep 8
docker compose ps
docker compose logs backend --tail 15

echo "==> Run migrations (no seed — admin data must not be overwritten)..."
docker compose exec -T backend composer install --no-dev --optimize-autoloader --no-interaction
docker compose exec -T backend php artisan migrate --force
docker compose exec -T backend php artisan config:cache
docker compose exec -T backend php artisan route:cache

echo "==> Test API..."
curl -s http://localhost/api/manufacturing-units | head -c 200
echo ""
echo "==> Done!"
