import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless";
import { Pool } from "pg";
import { neonConfig, Pool as NeonPool } from "@neondatabase/serverless";
import { attachDatabasePool } from "@vercel/functions";
import * as schema from "./schema";

// Lazily initialized so importing this module (e.g. while `next build` collects
// route config) never requires DATABASE_URL — the pool is created on first query.
// Follows the Neon guidance for Vercel Fluid compute: one module-scope pool reused
// across requests, registered with the Vercel runtime so idle connections drain
// before an instance suspends.
type DB = NodePgDatabase<typeof schema>;

let instance: DB | undefined;

// On Vercel, node-postgres talks straight to Neon over TCP and that is what the
// Fluid-compute pooling guidance above is written for. The weekly routine's cloud
// environment is different: it has no raw TCP egress at all, so :5432 is simply
// unreachable there and every query hangs. Neon's WebSocket driver leaves over
// 443 like any other HTTPS request, which that environment does allow — and it
// supports interactive transactions, which the HTTP driver does not and
// `issue:publish` needs. Same database, same SQL; only the transport differs.
function useWebSocketDriver(): boolean {
  return !process.env.VERCEL;
}

function initWebSocket(connectionString: string): DB {
  // Undici only reads HTTPS_PROXY when this is set. Setting it here rather than in
  // the npm scripts keeps it working however the script is invoked; the dispatcher
  // is built lazily on first request, so assigning it before we connect is enough.
  process.env.NODE_USE_ENV_PROXY ??= "1";
  neonConfig.webSocketConstructor ??= globalThis.WebSocket;
  const pool = new NeonPool({ connectionString });
  return drizzleWs({ client: pool, schema }) as unknown as DB;
}

function init(): DB {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  if (useWebSocketDriver()) {
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
