// @vitest-environment node
import "dotenv/config";
import { beforeAll, afterAll, describe, expect, test } from "vitest";
import { execSync } from "node:child_process";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/app/generated/prisma/client";
import { getFirstUser } from "@/lib/demo-user";
import { getDatabaseUrl } from "@/lib/db-url";

const adapter = new PrismaMariaDb(getDatabaseUrl());
const prisma = new PrismaClient({ adapter });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDatabase(retries = 20, delayMs = 500) {
  let lastError: unknown;
  for (let i = 0; i < retries; i += 1) {
    try {
      await prisma.$connect();
      return;
    } catch (error) {
      lastError = error;
      await sleep(delayMs);
    }
  }
  throw lastError;
}

describe("MariaDB Prisma", () => {
  beforeAll(async () => {
    execSync("docker compose up -d", { stdio: "inherit" });
    await waitForDatabase();
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
    execSync("npx prisma db seed", { stdio: "inherit" });
  }, 120_000);

  afterAll(async () => {
    await prisma.$disconnect();
    execSync("docker compose down", { stdio: "inherit" });
  });

  test("connects to MariaDB", async () => {
    await expect(prisma.$connect()).resolves.toBeUndefined();
  });

  test("first row is seeded user", async () => {
    const firstUser = await getFirstUser();

    expect(firstUser).not.toBeNull();
    expect(firstUser?.email).toBe("seeded@example.com");
    expect(firstUser?.name).toBe("Seeded User");
  });
});
