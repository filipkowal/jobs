import "server-only";
import qs from "query-string";
import { SERVER_URL, MOCK_SERVER_URL } from "./constants";
import type { Filters, Jobs } from "../types";
import { type Locale } from "@/i18n-config";
import { getCustomBoard } from "./helpers";

export async function getJobs({
  locale,
  searchParams,
  init,
}: {
  locale: Locale;
  searchParams?: any;
  init?: RequestInit;
}): Promise<Jobs> {
  return await getData({ endpoint: "jobs", locale, searchParams, init });
}

export async function getFilters({
  locale,
  init,
}: {
  locale: Locale;
  init?: RequestInit;
}): Promise<Filters> {
  return await getData({ endpoint: "filters", locale, init });
}

export async function getCustomUser({
  locale,
  // userId,
  init,
}: {
  locale: Locale;
  init?: RequestInit;
}): Promise<ReturnType<typeof getCustomBoard>> {
  return await getData({
    endpoint: "customBoard",
    locale,
    // searchParams: { userId: userId || "" },
    mock: true,
    init,
  });
}

async function getData({
  endpoint,
  locale,
  param,
  searchParams,
  mock,
  init = {},
}: {
  endpoint: string;
  locale?: Locale;
  param?: string;
  searchParams?: Record<string, any>;
  mock?: boolean;
  init?: RequestInit;
}) {
  try {
    const encodedSearchParams =
      searchParams && qs.stringify(searchParams, { arrayFormat: "bracket" });
    const url = `${mock ? MOCK_SERVER_URL : SERVER_URL}/${locale}/${endpoint}${
      param ? `/${param}` : ""
    }${encodedSearchParams?.length ? `?${encodedSearchParams}` : ""}`;

    const res = await fetch(url, init);

    return res.json();
  } catch (e: any) {
    throw Error("Failed fetching " + endpoint);
  }
}

// POST fetchers

export async function postData(endpoint: string, locale: Locale, data: any) {
  const url = `${SERVER_URL}/${locale}/${endpoint}`;
  const rawResponse = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!rawResponse.ok) {
    throw new Error(rawResponse.statusText);
  }

  const content = await rawResponse.json();
  return content;
}
