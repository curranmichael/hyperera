import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle as drizzleWebSocket } from "drizzle-orm/neon-serverless";
import { Pool } from "pg";
import { neonConfig, Pool as NeonPool } from "@neondatabase/serverless";
import { attachDatabasePool } from "@vercel/functions/db-connections";
import * as schema from "./schema";
import { databaseConnectionString } from "./config";

// Lazily initialized so importing this module (e.g. while `next build` collects
// route config) never requires a database credential — the pool is created on
// first query.
// Follows the Neon guidance for Vercel Fluid compute: one module-scope pool reused
// across requests, registered with the Vercel runtime so idle connections drain
// before an instance suspends.
type DB = NodePgDatabase<typeof schema>;

let instance: DB | undefined;

// Vercel Fluid compute can use its recommended module-scope node-postgres pool.
// The weekly runner cannot reach Postgres TCP/5432, so everywhere else uses
// Neon's node-postgres-compatible WebSocket pool over 443. Unlike neon-http,
// this transport supports the interactive transactions used by triage and
// issue:publish.
function shouldUseWebSocketDriver(): boolean {
  return !process.env.VERCEL;
}

function initWebSocket(connectionString: string): DB {
  if (!globalThis.WebSocket) {
    throw new Error(
      "This runtime has no WebSocket implementation; use Node 20.10 or newer",
    );
  }

  neonConfig.webSocketConstructor ??= globalThis.WebSocket;
  const pool = new NeonPool({ connectionString });
  return drizzleWebSocket({ client: pool, schema }) as unknown as DB;
}

function init(): DB {
  const connectionString = databaseConnectionString();
  if (shouldUseWebSocketDriver()) {
    return initWebSocket(connectionString);
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
