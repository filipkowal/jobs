import { ReadonlyURLSearchParams } from "next/navigation";
import { FILTER_NAMES } from "./constants";
import { ActiveFilters, JobsQuery } from "./types";

export const allUppercase = (text: string): string =>
  text.replace(/([A-Z])/g, " $&").replace(/^./, text[0].toUpperCase());

export function pickSearchParams(searchParams: ReadonlyURLSearchParams | null) {
  const pickedParams: ActiveFilters = {};

  if (!searchParams) {
    return pickedParams;
  }

  FILTER_NAMES.forEach((name) => {
    if (searchParams.has(name)) {
      const values = searchParams.getAll(name);

      if (
        [
          "categories",
          "technologies",
          "industries",
          "workLanguages",
          "jobLevels",
          "companySize",
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

export function removeEmptyFilters(activeFilters: JobsQuery) {
  return (
    activeFilters &&
    Object.fromEntries(
      Object.entries(activeFilters).filter(([_, value]) =>
        filterNotEmpty(value)
      )
    )
  );

  function filterNotEmpty(value: string[] | number[] | number | string | null) {
    return (
      (typeof value === "number" && value > 0) ||
      (typeof value !== "number" && value && value.length > 0)
    );
  }
}