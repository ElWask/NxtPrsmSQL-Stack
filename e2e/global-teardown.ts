import { execSync } from "node:child_process";

export default async function globalTeardown() {
  execSync("docker compose down", { stdio: "inherit" });
}
