import qs from "query-string";
import { SERVER_URL, MOCK_SERVER_URL } from "./constants";
import type { Filters, Jobs } from "./types";
import { type Locale } from "../i18n-config";
import { getCustomBoard } from "./server/helpers";

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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
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
  searchParams?: any;
  init?: RequestInit;
}): Promise<Jobs> {
  const { employerName, ...restSearchParams } = searchParams;

  const jobsResponse = await getData({
    endpoint: "jobs",
    locale,
    searchParams: employerName?.length > 0 ? searchParams : restSearchParams,
    init,
  });

  if (!jobsResponse) {
    throw new Error("No jobs response");
  } else if (!Object.keys(jobsResponse?.jobs || {})?.length) {
    throw new Error("Jobs of 0 length");
  }

  return jobsResponse;
}

export async function getFilters({
  locale,
  init,
}: {
  locale: Locale;
  init?: RequestInit;
}): Promise<Filters> {
  const filters = await getData({ endpoint: "filters", locale, init });

  if (!filters) throw new Error("No filters response");
  else if (Object.keys(filters).length === 0)
    throw new Error("Filters of 0 length");

  return filters;
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
