type DatabaseEnvironment = Record<string, string | undefined>;

const INJECTED_NEON_KEYS = ["NEON_BRANCH", "DATABASE_URL_UNPOOLED"] as const;

function value(env: DatabaseEnvironment, key: string): string | undefined {
  const raw = env[key]?.trim();
  return raw ? raw : undefined;
}

function validateConnectionString(connectionString: string, source: string): string {
  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    throw new Error(`${source} is not a valid Postgres connection string`);
  }

  if (
    (url.protocol !== "postgres:" && url.protocol !== "postgresql:") ||
    !url.hostname ||
    !url.pathname.slice(1)
  ) {
    throw new Error(`${source} is not a valid Postgres connection string`);
  }

  return connectionString;
}

/**
 * Undici — and so `fetch` and `WebSocket` — reads HTTPS_PROXY only when
 * NODE_USE_ENV_PROXY is set, and the weekly runner reaches Neon over WebSockets
 * through exactly such a proxy. Setting it here rather than as an npm-script
 * prefix covers every entry point into the database, including `images:dither`
 * and `images:generate` (both read published stories) and any ad-hoc
 * `node --import tsx scripts/…` invocation.
 *
 * `??=` so an explicit setting still wins, and the npm prefixes stay a no-op.
 * Undici builds its dispatcher lazily on first request, so assigning this before
 * the first connection is enough.
 */
export function useEnvironmentProxy(env: DatabaseEnvironment = process.env): void {
  env.NODE_USE_ENV_PROXY ??= "1";
}

/**
 * Resolve the magazine database without letting a generic Neon integration
 * silently replace the weekly routine's configured target.
 *
 * Vercel intentionally owns DATABASE_URL for the deployed app. The unattended
 * weekly runner is different: if it exposes the pair of variables Neon
 * integrations inject, it must use the publication-specific override instead.
 */
export function databaseConnectionString(
  env: DatabaseEnvironment = process.env,
): string {
  const dedicated = value(env, "HYPERERA_DATABASE_URL");
  if (dedicated) {
    return validateConnectionString(dedicated, "HYPERERA_DATABASE_URL");
  }

  const generic = value(env, "DATABASE_URL");
  if (!generic) {
    throw new Error("HYPERERA_DATABASE_URL or DATABASE_URL is not set");
  }

  const looksInjected = INJECTED_NEON_KEYS.every((key) => value(env, key));
  if (!value(env, "VERCEL") && looksInjected) {
    throw new Error(
      "Refusing integration-injected DATABASE_URL outside Vercel. " +
        "Set HYPERERA_DATABASE_URL to the magazine branch connection string; " +
        "it takes precedence over Neon integration variables.",
    );
  }

  return validateConnectionString(generic, "DATABASE_URL");
}
