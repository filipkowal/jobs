import { ReadonlyURLSearchParams } from "next/navigation";
import { ACTIVE_FILTER_NAMES } from "./constants";
import { ActiveFilters } from "./types";

export const allUppercase = (text: string): string =>
  text.replace(/([A-Z])/g, " $&").replace(/^./, text[0].toUpperCase());

//@fixme how to remove it or make it responsive to activeFilers list
export function pickActiveFiltersFromSearchParams(
  searchParams: ReadonlyURLSearchParams | null
) {
  const pickedParams: ActiveFilters = {};

  if (!searchParams) {
    return pickedParams;
  }

  ACTIVE_FILTER_NAMES.forEach((name) => {
    if (searchParams.has(name)) {
      const values = searchParams.getAll(name);

      if (
        [
          "careerFields",
          "technologies",
          "industries",
          "workLanguages",
          "jobLevels",
          "companySizes",
          "states",
        ].includes(name)
      ) {
        (pickedParams[name] as string[]) = values;
      } else if (name === "workload") {
        pickedParams[name] = values.map(Number);
      } else if (["salary", "homeOffice"].includes(name)) {
        (pickedParams[name] as number) = Number(values[0]);
      }
    }
  });

  return pickedParams;
}

export function getShortId(str?: string) {
  if (!str) {
    return "";
  }

  return str.slice(-6);
}
