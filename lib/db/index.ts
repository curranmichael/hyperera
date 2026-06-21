import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";
import * as schema from "./schema";

// Lazily initialized so importing this module (e.g. while `next build` collects
// route config) never requires DATABASE_URL — the pool is created on first query.
// Follows the Neon guidance for Vercel Fluid compute: one module-scope pool reused
// across requests, registered with the Vercel runtime so idle connections drain
// before an instance suspends.
type DB = NodePgDatabase<typeof schema>;

let instance: DB | undefined;

function init(): DB {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = new Pool({ connectionString });
  try {
    attachDatabasePool(pool);
  } catch {
    // No-op outside the Vercel runtime (e.g. local scripts).
  }
  return drizzle({ client: pool, schema });
}

export const db = new Proxy({} as DB, {
  get(_target, prop) {
    instance ??= init();
    const value = instance[prop as keyof DB];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
});

export { schema };
