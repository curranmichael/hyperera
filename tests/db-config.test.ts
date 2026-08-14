import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { databaseConnectionString, useEnvironmentProxy } from "../lib/db/config";

const magazine = "postgresql://magazine:secret@magazine.neon.tech/neondb";
const injected = "postgresql://integration:secret@stale.neon.tech/neondb";

describe("databaseConnectionString", () => {
  it("prefers the publication-specific URL over injected Neon variables", () => {
    assert.equal(
      databaseConnectionString({
        HYPERERA_DATABASE_URL: magazine,
        DATABASE_URL: injected,
        DATABASE_URL_UNPOOLED: injected,
        NEON_BRANCH: "production",
      }),
      magazine,
    );
  });

  it("refuses a generic integration-injected URL outside Vercel", () => {
    assert.throws(
      () =>
        databaseConnectionString({
          DATABASE_URL: injected,
          DATABASE_URL_UNPOOLED: injected,
          NEON_BRANCH: "production",
        }),
      /Refusing integration-injected DATABASE_URL/,
    );
  });

  it("accepts DATABASE_URL when no integration collision is present", () => {
    assert.equal(databaseConnectionString({ DATABASE_URL: magazine }), magazine);
  });

  it("allows Vercel to own its injected DATABASE_URL", () => {
    assert.equal(
      databaseConnectionString({
        DATABASE_URL: magazine,
        DATABASE_URL_UNPOOLED: magazine,
        NEON_BRANCH: "production",
        VERCEL: "1",
      }),
      magazine,
    );
  });

  it("rejects missing and malformed connection strings", () => {
    assert.throws(() => databaseConnectionString({}), /is not set/);
    assert.throws(
      () => databaseConnectionString({ DATABASE_URL: "not-a-url" }),
      /not a valid Postgres connection string/,
    );
  });
});

describe("useEnvironmentProxy", () => {
  it("opts undici into HTTPS_PROXY when nothing has said otherwise", () => {
    const env: Record<string, string | undefined> = {};
    useEnvironmentProxy(env);
    assert.equal(env.NODE_USE_ENV_PROXY, "1");
  });

  it("leaves an explicit setting alone", () => {
    const env: Record<string, string | undefined> = { NODE_USE_ENV_PROXY: "0" };
    useEnvironmentProxy(env);
    assert.equal(env.NODE_USE_ENV_PROXY, "0");
  });
});
