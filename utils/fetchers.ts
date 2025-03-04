import type { ActiveFilters } from "./types";
import { type Locale } from "@/i18n-config";
import { buildQueryString, createUrl } from "./helpers";

export async function postData({
  endpoint,
  locale,
  data,
  boardId,
}: {
  endpoint: string;
  locale: Locale;
  data: any;
  boardId: string;
}) {
  const url = createUrl({
    endpoint,
    locale,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Custom-Board-Id": boardId,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const content = await response.json();
  return content;
}

export async function getFilteredJobs({
  locale,
  searchParams,
  init,
}: {
  locale: Locale;
  searchParams?: ActiveFilters & { page?: number | string };
  init?: RequestInit;
}): Promise<Response> {
  // In the browser, we can use relative URLs
  const baseUrl = typeof window !== 'undefined' 
    ? '' // Use relative URL in the browser
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : `http://${process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"}`;

  return fetch(
    `${baseUrl}/api/${locale}/jobs?${buildQueryString(searchParams)}`,
    init
  );
}
