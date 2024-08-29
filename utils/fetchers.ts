import type { Endpoint, Filters, Jobs, JobsQuery } from "./types";
import { type Locale } from "@/i18n-config";
import { createUrl } from "./helpers";

export async function postData({
  endpoint,
  locale,
  data,
  customBoardId,
}: {
  endpoint: string;
  locale: Locale;
  data: any;
  customBoardId: string;
}) {
  const url = createUrl({
    endpoint,
    locale,
    searchParams: { customBoardId },
  });

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

async function getData({
  endpoint,
  locale,
  param,
  searchParams,
  init = {},
}: {
  endpoint: Endpoint;
  locale: Locale;
  param?: string;
  searchParams?: Record<string, any>;
  init?: RequestInit;
}) {
  try {
    const url = createUrl({
      endpoint,
      locale,
      param,
      searchParams,
    });

    const res = await fetch(url, init);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status} in ${url}`);
    }

    return res.json();
  } catch (e: any) {
    throw Error("Failed fetching " + endpoint + ": " + e.message);
  }
}

export async function getJobs({
  locale,
  searchParams,
  init,
}: {
  locale: Locale;
  searchParams: JobsQuery;
  init?: RequestInit;
}): Promise<Jobs> {
  try {
    return await getData({
      endpoint: "jobs",
      locale,
      searchParams,
      init,
    });
  } catch (error) {
    throw error;
  }
}

export async function getFilters({
  locale,
  customBoardId,
  init,
}: {
  locale: Locale;
  customBoardId: string;
  init?: RequestInit;
}): Promise<Filters> {
  try {
    return await getData({
      endpoint: "filters",
      locale,
      init,
      searchParams: { customBoardId },
    });
  } catch (error) {
    throw error;
  }
}
