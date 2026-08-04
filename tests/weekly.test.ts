import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { scoreOf, suggestTitle } from "../lib/weekly";

describe("scoreOf", () => {
  it("scores news on corroboration: importance × sources × days", () => {
    assert.equal(
      scoreOf({ department: "news", importance: 7, sourceCount: 3, daySpan: 2 }),
      42,
    );
  });

  it("scores culture on importance alone — one source is its nature, not a flaw", () => {
    assert.equal(
      scoreOf({ department: "culture", importance: 7, sourceCount: 1, daySpan: 1 }),
      7,
    );
    assert.equal(
      scoreOf({ department: "culture", importance: 7, sourceCount: 5, daySpan: 3 }),
      7,
    );
  });
});

describe("suggestTitle", () => {
  it("collapses the month when the week stays inside one", () => {
    assert.equal(
      suggestTitle(4, "2026-08-10", "2026-08-16"),
      "Issue 4 · 10–16 August 2026",
    );
  });

  it("names both months when the week crosses one", () => {
    assert.equal(
      suggestTitle(5, "2026-08-28", "2026-09-03"),
      "Issue 5 · 28 August – 3 September 2026",
    );
  });

  it("takes the year from the week's end", () => {
    assert.equal(
      suggestTitle(6, "2026-12-28", "2027-01-03"),
      "Issue 6 · 28 December – 3 January 2027",
    );
  });
});
