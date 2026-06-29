"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Analytics } from "@vercel/analytics/next";

type Consent = "accepted" | "denied";

const CONSENT_COOKIE = "cookie-consent";
const REGION_COOKIE = "consent-required";
const ONE_YEAR = 60 * 60 * 24 * 365;

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// The banner shows only to readers whose region requires consent (set by
// middleware) and who haven't chosen yet. Vercel Analytics loads right away
// elsewhere; in a consent region it waits for an explicit "Accept all".
export function CookieConsent() {
  const [required, setRequired] = useState(false);
  const [consent, setConsent] = useState<Consent>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRequired(readCookie(REGION_COOKIE) === "1");
    setConsent(readCookie(CONSENT_COOKIE) as Consent | undefined);
    setReady(true);
  }, []);

  function decide(choice: Consent) {
    document.cookie = `${CONSENT_COOKIE}=${choice}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
    setConsent(choice);
  }

  const analyticsAllowed = ready && (!required || consent === "accepted");
  const showBanner = ready && required && !consent;

  return (
    <>
      {analyticsAllowed && <Analytics />}
      {showBanner && (
        <div
          className="cookie-banner"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="cookie-banner__panel">
            <p className="cookie-banner__text">
              Cookie banners are ugly, annoying, and make the internet worse.
              Unfortunately, we have to have one because of EU law. Please click
              ‘Accept all’ to help us understand where our readers are finding us
              so we can reach more people. Thank you for reading!{" "}
              <NextLink href="/cookie-policy" className="cookie-banner__policy">
                Read Cookie Policy
              </NextLink>
            </p>
            <hr className="cookie-banner__rule" />
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__btn"
                onClick={() => decide("denied")}
              >
                Deny
              </button>
              <button
                type="button"
                className="cookie-banner__btn cookie-banner__btn--primary"
                onClick={() => decide("accepted")}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
