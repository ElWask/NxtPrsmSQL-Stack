#!/usr/bin/env bash
set -euo pipefail

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

echo "Starting MariaDB via Docker Compose"
docker compose up -d

echo "Waiting for MariaDB to be ready"
npx tsx scripts/wait-mariadb.ts

echo "Running Prisma migrations"
npx prisma migrate deploy

echo "Seeding database"
npx prisma db seed

echo "Starting Next.js dev server"
exec npm run dev -- --hostname 127.0.0.1 --port 3000
