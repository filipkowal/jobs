import { useMemo } from "react";
import { type JobsQuery, type Locale } from "./types";

export function ActiveFiltersURL(
  activeFilters: JobsQuery,
  locale: Locale
): string {
  const anyActiveFilters =
    activeFilters && Object.keys(activeFilters).length > 0;

  const newSearchParams = useMemo(() => {
    const searchParams = new URLSearchParams();

    if (!activeFilters) return searchParams;

    for (const key in activeFilters) {
      const value = activeFilters[key as keyof typeof activeFilters];

      if (!value) continue;
      else if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }

    return searchParams;
  }, [activeFilters]);

  if (anyActiveFilters) {
    return `/${locale}/filtered?${newSearchParams.toString()}`;
  }

  return `/${locale}`;
}
