"use client";

import Script from "next/script";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function GoogleTagManager() {
  const { hasConsent } = useCookieConsent();

  // SECURITY ALERT: GTM container GTM-PZR49N2Q appears to be suspicious
  // Temporarily disabled to prevent potential malicious injection
  // TODO: Replace with legitimate GTM container ID
  return null;

  // Original code commented out for security:
  /*
  if (!hasConsent) return null;

  return (
    <Script
      strategy="lazyOnload"
      id="gtag-base"
      src={`https://www.googletagmanager.com/gtag/js?id=GTM-PZR49N2Q`}
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){window.dataLayer.push(arguments);}
        window.gtag('js', new Date());
        window.gtag('config', 'GTM-PZR49N2Q', {
          page_path: window.location.pathname,
        });
      }}
    />
  );
  */
}
