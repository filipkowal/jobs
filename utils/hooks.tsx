import { DragEventHandler, MouseEventHandler, useMemo, useState } from "react";
import { type JobsQuery, type Locale } from "./types";

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
