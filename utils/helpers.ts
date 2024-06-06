import { ReadonlyURLSearchParams } from "next/navigation";
import { ACTIVE_FILTER_NAMES } from "./constants";
import { ActiveFilterName, ActiveFilters } from "./types";

export const allUppercase = (text: string): string =>
  text.replace(/([A-Z])/g, " $&").replace(/^./, text[0].toUpperCase());

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
