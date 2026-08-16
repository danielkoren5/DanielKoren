// Creates a local .env from .env.example on first run.
//
// .env stays out of git (it holds real secrets once this moves off SQLite),
// so a fresh clone has no DATABASE_URL and Prisma fails at startup. Rather
// than making every new machine remember a manual copy step, we create the
// file automatically and only when it is genuinely absent — an existing .env
// is never touched.

import { copyFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env");
const examplePath = join(root, ".env.example");

if (existsSync(envPath)) {
  process.exit(0);
}

if (!existsSync(examplePath)) {
  console.error("Missing .env.example — cannot create .env automatically.");
  process.exit(1);
}

copyFileSync(examplePath, envPath);
console.log("נוצר קובץ .env מתוך .env.example");
