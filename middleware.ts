import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let expectedLanguages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();
  // @ts-ignore locales are readonly
  const availableLocales: string[] = i18n.locales;
  console.log(
    "expectedLanguages: ",
    expectedLanguages,
    ", availableLocales: ",
    availableLocales,
    ", defaultLocale: ",
    i18n.defaultLocale
  );
  return matchLocale(expectedLanguages, availableLocales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (PUBLIC_FILE.test(pathname)) return;

  if (
    pathname.includes("/images") ||
    pathname.includes("/fonts") ||
    pathname.includes("sentry")
  )
    return;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}${pathname ? `/${pathname}` : ""}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
