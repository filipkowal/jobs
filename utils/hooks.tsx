import {
  DragEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import type {
  ActiveFilters,
  ActiveFilterName,
  Filters,
  CustomBoard,
  JobsQuery,
  Locale,
} from "@/utils";

export function useActiveFiltersURL(
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

export function useIsDraggingOver() {
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    return e;
  };

  const onDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
      // Ignore the event if the mouse pointer is entering a child element.
      return;
    }

    setIsDragging(false);
    return e;
  };

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }

    setIsDragging(false);
    return e;
  };

  return {
    isDragging,
    onDragEnter,
    onDragLeave,
    onMouseLeave,
  };
}

function notEmpty(v: any): boolean {
  return (
    ((Array.isArray(v) || typeof v === "string") && !!v.length) ||
    (typeof v === "number" && v > 0)
  );
}

export function useFilters(
  initialActiveFilters: ActiveFilters,
  filters: Filters,
  customBoard: CustomBoard
) {
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(initialActiveFilters);

  const setActiveFilter = (filterName: ActiveFilterName, value: any) => {
    setActiveFilters((prev) => {
      const updatedFilters = { ...prev, [filterName]: value };

      if (!notEmpty(value)) {
        delete updatedFilters[filterName];
      }

      return updatedFilters;
    });
  };

  const isFilterVisible = useCallback(
    (filterName: keyof typeof filters): boolean => {
      return (
        !!filters[filterName] &&
        !customBoard.hiddenFilters?.[
          filterName as keyof typeof customBoard.hiddenFilters
        ]
      );
    },
    [filters, customBoard]
  );

  return { activeFilters, setActiveFilters, setActiveFilter, isFilterVisible };
}
