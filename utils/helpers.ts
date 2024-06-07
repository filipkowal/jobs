import { ReadonlyURLSearchParams } from "next/navigation";
import { ACTIVE_FILTER_NAMES } from "./constants";
import { ActiveFilters } from "./types";

export const capitalize = (text: string): string => {
  if (!text) return "";
  // Split the string into words, considering consecutive uppercase letters as a single word
  const words = text.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g) || [];
  // Capitalize the first letter of each word and join them with spaces
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

//@fixme how to remove it or make it responsive to activeFilers list
export function pickActiveFiltersFromSearchParams(
  searchParams: ReadonlyURLSearchParams | null
): ActiveFilters {
  const pickedParams: ActiveFilters = {};

  if (!searchParams) {
    return pickedParams;
  }

  for (const name of ACTIVE_FILTER_NAMES) {
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

export function getShortId(str?: string) {
  if (!str) {
    return "";
  }

  return str.slice(-6);
}
