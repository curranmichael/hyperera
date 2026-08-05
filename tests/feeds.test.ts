import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { clampDays, shardUrls } from "../lib/feeds";

describe("clampDays", () => {
  // The regression this exists to pin down: an absent ?days= parameter must use
  // the fallback, not coerce Number(null) === 0 and clamp to 1. With the cron
  // sending no query string, that difference is the daily ingest coverage hole.
  it("uses the fallback when the parameter is absent", () => {
    assert.equal(clampDays(null, 2, 14), 2);
  });

  it("uses the fallback for empty and non-numeric input", () => {
    assert.equal(clampDays("", 2, 14), 2);
    assert.equal(clampDays("   ", 2, 14), 2);
    assert.equal(clampDays("abc", 2, 14), 2);
  });

  it("clamps numeric input to [1, max]", () => {
    assert.equal(clampDays("0", 2, 14), 1);
    assert.equal(clampDays("-3", 2, 14), 1);
    assert.equal(clampDays("5", 2, 14), 5);
    assert.equal(clampDays("99", 2, 14), 14);
  });

  it("truncates fractional input", () => {
    assert.equal(clampDays("3.9", 2, 14), 3);
  });
});

describe("shardUrls", () => {
  const template = "https://example.com/rss?q=x+after:{after}+before:{before}";

  it("emits one shard per day, most recent first, with exclusive bounds", () => {
    const end = new Date("2026-08-04T05:00:00Z");
    const shards = shardUrls(template, 2, end);
    assert.equal(shards.length, 2);
    assert.deepEqual(shards[0], {
      day: "2026-08-04",
      url: "https://example.com/rss?q=x+after:2026-08-04+before:2026-08-05",
    });
    assert.deepEqual(shards[1], {
      day: "2026-08-03",
      url: "https://example.com/rss?q=x+after:2026-08-03+before:2026-08-04",
    });
  });

  it("crosses month boundaries by calendar day", () => {
    const end = new Date("2026-08-01T12:00:00Z");
    const shards = shardUrls(template, 2, end);
    assert.equal(shards[0].day, "2026-08-01");
    assert.equal(shards[1].day, "2026-07-31");
  });
});
