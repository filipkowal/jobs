import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const expectedLanguages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();
  // @ts-ignore locales are readonly
  const availableLocales: string[] = i18n.locales;

  try {
    return matchLocale(
      expectedLanguages?.length === 1 && expectedLanguages[0] === "*"
        ? [i18n.defaultLocale]
        : expectedLanguages || [i18n.defaultLocale],
      availableLocales,
      i18n.defaultLocale
    );
  } catch (error) {
    console.error("Error matching locale:", error);
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (PUBLIC_FILE.test(pathname)) return;

  if (
    pathname.includes("/images") ||
    pathname.includes("/fonts") ||
    pathname.includes("sentry") ||
    pathname.includes("/revalidate")
  )
    return;

  // Extract the first segment as potential locale
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  // Check if first segment is a valid locale
  const isValidLocale =
    firstSegment && i18n.locales.includes(firstSegment as any);

  // If first segment exists but is not a valid locale, redirect to default locale
  if (firstSegment && !isValidLocale) {
    // Redirect invalid locale paths (e.g., /pes.php/jobs) to default locale
    const restOfPath = pathSegments.slice(1).join("/");
    const redirectPath = restOfPath
      ? `/${i18n.defaultLocale}/${restOfPath}`
      : `/${i18n.defaultLocale}`;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

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
