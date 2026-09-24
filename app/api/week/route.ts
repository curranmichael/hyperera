// The week's corpus over HTTP, for the weekly routine.
//
// The routine runs in a cloud environment that holds no database credential —
// keeping one there correct is what broke publishing through August and
// September. The deployed app already has the connection, so it reads the corpus
// on the routine's behalf. Read-only, and everything in it is derived from public
// feeds, so it needs no secret either.
//
//   GET /api/week                         -- the 7 days ending today (UTC)
//   GET /api/week?end=2026-09-24&days=7
//   GET /api/week?start=2026-09-18&end=2026-09-24&limit=60

import { NextResponse } from "next/server";
import { buildWeek, DEFAULT_DAYS, DEFAULT_LIMIT, isoDay } from "@/lib/week";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAYS = 31;
const MAX_LIMIT = 100;

function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function positive(raw: string | null, fallback: number, cap: number): number | null {
  if (raw === null) return fallback;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1 || n > cap) return null;
  return n;
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;

  const end = params.get("end") ?? isoDay(new Date());
  if (!ISO_DATE.test(end)) return bad("end must be YYYY-MM-DD");

  const days = positive(params.get("days"), DEFAULT_DAYS, MAX_DAYS);
  if (days === null) return bad(`days must be an integer from 1 to ${MAX_DAYS}`);
  const limit = positive(params.get("limit"), DEFAULT_LIMIT, MAX_LIMIT);
  if (limit === null) return bad(`limit must be an integer from 1 to ${MAX_LIMIT}`);

  let start = params.get("start");
  if (start !== null) {
    if (!ISO_DATE.test(start)) return bad("start must be YYYY-MM-DD");
    if (start > end) return bad("start is after end");
    const span =
      (Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000 + 1;
    if (span > MAX_DAYS) return bad(`the window is capped at ${MAX_DAYS} days`);
  } else {
    const from = new Date(`${end}T00:00:00Z`);
    from.setUTCDate(from.getUTCDate() - (days - 1));
    start = isoDay(from);
  }

  try {
    return NextResponse.json(await buildWeek({ start, end, limit }), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const status = message.startsWith("No candidates") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
