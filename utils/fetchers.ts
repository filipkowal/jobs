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
      throw new Error(`HTTP error! status: ${res.status} in ${url}`);
    }

    return res.json();
  } catch (e: any) {
    const message = "Failed fetching " + endpoint + ": " + e.message;

    if (
      typeof document === "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      // throw only on server-side on production to prevent creating a new build and keep the old one
      throw Error("Failed fetching " + endpoint + ": " + e.message);
    }
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
  const jobsResponse = await getData({
    endpoint: "jobs",
    locale,
    searchParams,
    init,
  });

  throwOnNoDataWhenBuilding(jobsResponse, jobsResponse?.jobs, "jobs");

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

  throwOnNoDataWhenBuilding(filters, filters, "filters");

  return filters;
}

export async function getCustomUser({
  locale,
  init,
}: {
  locale: Locale;
  init?: RequestInit;
}): Promise<ReturnType<typeof getCustomBoard>> {
  return await getData({
    endpoint: "customBoard",
    locale,
    mock: true,
    init,
  });
}

function throwOnNoDataWhenBuilding(
  reponse: Response,
  responseContent: any,
  responseName: string
) {
  // Stop server-side building if no data to display. Keep the previous build.

  // Don't throw on client-side
  if (typeof document !== "undefined" || process.env.NODE_ENV !== "production")
    return;

  if (!reponse) {
    throw new Error("No response when building: " + responseName.toUpperCase());
  }

  if (!responseContent) {
    throw new Error(
      "Response of 0 length when building: " + responseName.toUpperCase()
    );
  }
}
