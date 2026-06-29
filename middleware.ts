import { NextResponse, type NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

// EU + EEA + UK: the regions whose cookie laws (GDPR / ePrivacy, UK PECR) require
// opt-in consent before non-essential analytics may load. Everywhere else
// (incl. California, which is opt-out) the banner stays hidden.
const CONSENT_REGIONS = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB",
]);

export function middleware(request: NextRequest) {
  const { country } = geolocation(request);
  // No geolocation in local dev, so force the banner on there for testing.
  const required =
    process.env.NODE_ENV !== "production"
      ? true
      : !!country && CONSENT_REGIONS.has(country);

  const response = NextResponse.next();
  response.cookies.set("consent-required", required ? "1" : "0", {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
