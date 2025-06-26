'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type CookieConsentContextType = {
  hasConsent: boolean;
  setHasConsent: (consent: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextType>({
  hasConsent: false,
  setHasConsent: () => {},
});

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      setHasConsent(!!localStorage.getItem("cookieConsent"));
    }
  }, []);

  return (
    <CookieConsentContext.Provider value={{ hasConsent, setHasConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(CookieConsentContext); 