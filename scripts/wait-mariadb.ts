import "dotenv/config";
import mariadb from "mariadb";
import { setTimeout as sleep } from "node:timers/promises";
import { getDatabaseUrl } from "../lib/db-url";

const parsed = new URL(getDatabaseUrl());
const config = {
  host: parsed.hostname,
  port: parsed.port ? Number(parsed.port) : 3306,
  user: decodeURIComponent(parsed.username),
  password: decodeURIComponent(parsed.password),
  database: parsed.pathname.replace(/^\//, ""),
};

async function waitForDatabase(retries = 20, delayMs = 500) {
  let lastError: unknown;
  for (let i = 0; i < retries; i += 1) {
    try {
      const connection = await mariadb.createConnection(config);
      await connection.end();
      return;
    } catch (error) {
      lastError = error;
      await sleep(delayMs);
    }
  }
  throw lastError;
}

async function main() {
  await waitForDatabase();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
