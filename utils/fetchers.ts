import type { Endpoint, Filters, Jobs, JobsQuery } from "./types";
import { type Locale } from "@/i18n-config";
import { createUrl } from "./helpers";

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

  const rawResponse = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Custom-Board-Id": boardId,
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
  boardId,
}: {
  endpoint: Endpoint;
  locale: Locale;
  param?: string;
  searchParams?: Record<string, any>;
  init?: RequestInit;
  boardId?: string;
}) {
  try {
    const url = createUrl({
      endpoint,
      locale,
      param,
      searchParams,
    });

    const res = await fetch(url, {
      ...init,
      headers: { ...init.headers, "Board-Id": boardId || "" },
    });

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
  boardId,
}: {
  locale: Locale;
  searchParams?: JobsQuery;
  init?: RequestInit;
  boardId?: string;
}): Promise<Jobs> {
  try {
    return await getData({
      endpoint: "jobs",
      locale,
      searchParams,
      init,
      boardId,
    });
  } catch (error) {
    throw error;
  }
}
