"use client";

import Script from "next/script";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function GoogleTagManager() {
  const { hasConsent } = useCookieConsent();

  if (!hasConsent) return null;

  return (
    <Script
      strategy="lazyOnload"
      id="gtag-base"
      src={`https://www.googletagmanager.com/gtag/js?id=GTM-PZR49N2Q`}
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", "GTM-PZR49N2Q", {
          page_path: window.location.pathname,
        });
      }}
    />
  );
}
