import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load DATABASE_URL for drizzle-kit migrate/push/studio (generate needs no DB).
config({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});
