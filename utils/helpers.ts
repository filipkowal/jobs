import { ReadonlyURLSearchParams } from "next/navigation";
import { FILTER_NAMES, JOBS_LIMIT } from "./constants";
import { ActiveFilters, CustomBoard, Jobs } from "./types";
import qs from "query-string";
import { SERVER_URL } from "./constants";

export function paginate(arr: any[] | undefined, page = 0, limit = JOBS_LIMIT) {
  if (!arr) return [];
  return arr.slice(page * limit, limit * (page + 1));
}

export function pickActiveFiltersFromSearchParams(
  searchParams: ReadonlyURLSearchParams | URLSearchParams | null
): ActiveFilters {
  const pickedParams: ActiveFilters = {};

  if (!searchParams) {
    return pickedParams;
  }

  for (const name of FILTER_NAMES) {
    const values = searchParams.getAll(name);

    if (values.length > 0) {
      if (name === "workload") {
        pickedParams[name] = values.map(Number);
      } else if (name === "salary" || name === "homeOffice") {
        pickedParams[name] = Number(values[0]);
      } else {
        pickedParams[name] = values;
      }
    }
  }

  return pickedParams;
}

export function createUrl({
  endpoint,
  locale,
  param,
  searchParams,
}: {
  endpoint: string;
  locale: string;
  param?: string;
  searchParams?: Record<string, any>;
}): string {
  const nonEmptySearchParams = searchParams
    ? Object.fromEntries(
        Object.entries(searchParams).filter(
          ([, value]) => value !== "" && value !== undefined
        )
      )
    : {};

  const encodedSearchParams =
    nonEmptySearchParams &&
    qs.stringify(nonEmptySearchParams, { arrayFormat: "bracket" });

  return `${SERVER_URL}/${locale}/${endpoint}${param ? `/${param}` : ""}${
    encodedSearchParams?.length ? `?${encodedSearchParams}` : ""
  }`;
}

export function buildQueryString(
  params?: Record<string, string | number | string[] | number[]>
): string {
  if (!params) {
    return "";
  }

  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
}

export function getShortId(str?: string) {
  if (!str) {
    return "";
  }

  return str.slice(-6);
}

export function k(s: string | number | undefined) {
  if (s === undefined) return;
  const n = Number(s) / 1000;
  return n;
}

export function sortJobsInitOpenFirst(
  jobs?: Jobs["jobs"],
  jobTitleId?: string
): Jobs["jobs"] {
  if (jobTitleId) {
    return jobs?.sort((a, b) => {
      if (getShortId(a.id) === getShortId(jobTitleId)) {
        return -1;
      } else if (getShortId(b.id) === getShortId(jobTitleId)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  return jobs;
}

export function sanitizeUrlString(str?: string) {
  if (!str) return;
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace any sequence of non-alphanumeric characters with a hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

export function updateUrlToOpenJob({
  job,
  locale,
  customBoard,
  initOpenJobTitleId,
  isInitOpenJob,
  lastOpenJobId,
  setLastOpenJobId,
}: {
  job?: { id?: string; title?: string };
  locale: string;
  customBoard: { disableDetailView: boolean };
  initOpenJobTitleId?: string;
  isInitOpenJob: () => boolean;
  lastOpenJobId: string | null;
  setLastOpenJobId: (id: string | null) => void;
}) {
  if (typeof window === "undefined") return;
  if (customBoard.disableDetailView) return;

  if (!job?.id) return;

  // Keep the initially open job always open
  if (isInitOpenJob()) return;

  const initialUrl = initOpenJobTitleId
    ? `/${locale}/jobs/${initOpenJobTitleId}`
    : `/${locale}`;

  if (lastOpenJobId === job.id) {
    setLastOpenJobId(null);
    window.history.pushState({}, "", initialUrl);
    return;
  }

  const jobTitleId = sanitizeUrlString(job.title) + "-" + getShortId(job.id);
  setLastOpenJobId(job.id);

  window.history.pushState({}, "", `/${locale}/jobs/${jobTitleId}`);
}

export function stripOfEmptyStringsAndArrays(
  obj: Record<string, any>
): Record<string, any> {
  // Filters out any empty strings or empty arrays from the object
  const filteredObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (
      (typeof value === "string" || Array.isArray(value)) &&
      value.length > 0
    ) {
      filteredObj[key] = value;
    }
  }

  return filteredObj;
}

export function getCustomHeaderColors(customBoard?: CustomBoard) {
  const textColor = customBoard?.colors.headerText;
  const bgColor = customBoard?.colors.headerBackground;

  return {
    textColor,
    bgColor,
    isCustom: !!(textColor || bgColor),
  };
}
