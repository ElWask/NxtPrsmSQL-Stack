This is a [Next.js](https://nextjs.org) project.

## Quick Setup

Prerequisites:

- Node.js + npm
- Docker Desktop (or Docker Engine)

```bash
npm install
cp .env.example .env
docker compose up -d
npx tsx scripts/wait-mariadb.ts
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Open http://127.0.0.1:3000 in your browser. The home page reads the first user from the database (seeded data) to prove end-to-end connectivity.

## Tests

```bash
npm run test
npm run lint
npx playwright test
```

Notes:

- `npm run test` starts/stops MariaDB via Docker Compose.
- `npx playwright test` starts MariaDB, runs migrations + seed, and starts the Next.js dev server.
- `.env` is gitignored; use `.env.example` as the template.

## Quick DB View (CLI)

```bash
docker compose up -d
docker exec -i urana-mariadb-1 mariadb -u"${DB_USER}" -p"${DB_PASSWORD}" -e "SHOW DATABASES; USE ${DB_NAME}; SHOW TABLES; SELECT * FROM User;"
```

## CI Secrets

GitHub Actions expects the following secrets:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_ROOT_PASSWORD`

## Production Stack

- Next.js (App Router)
- Prisma ORM
- MariaDB
- Zod
- Docker (local)
- Auth.js

## Docs

- `/Users/charlys/Documents/dev/urana/docs/stack.md` explains how Prisma, Docker, and MariaDB work together, with diagrams.
