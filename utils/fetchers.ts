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
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${locale}/jobs/?${buildQueryString(
      searchParams
    )}`,
    init
  );
}
