import {
  DragEventHandler,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ActiveFilters,
  ActiveFilterName,
  Filters,
  CustomBoard,
  Locale,
  Job,
} from "@/utils";
import { PinnedJobsContext } from "@/app/[locale]/PinnedJobsContextProvider";

export function useActiveFiltersURL(
  activeFilters: ActiveFilters | undefined,
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

    if (e.relatedTarget && e.currentTarget?.contains(e.relatedTarget as Node)) {
      // Ignore the event if the mouse pointer is entering a child element.
      return;
    }

    setIsDragging(false);
    return e;
  };

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.relatedTarget && e.currentTarget?.contains(e.relatedTarget as Node)) {
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

// Filters

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

// JobColumnTable

export const usePinnedJobs = (jobs: Job[]) => {
  const { pinnedJobs: pinnedJobsIds, setPinnedJobs } =
    useContext(PinnedJobsContext);

  const pinnedJobs = useMemo(() => {
    return jobs.filter((job) => pinnedJobsIds.includes(job.id as string));
  }, [jobs, pinnedJobsIds]);

  const removePinnedJob = useCallback(
    (id: string) => {
      setPinnedJobs(pinnedJobsIds.filter((jobId) => jobId !== id));
    },
    [pinnedJobsIds, setPinnedJobs]
  );

  return { pinnedJobs, removePinnedJob, pinnedJobsIds };
};

export const useScrollJobTable = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showRightArrowButton, setShowRightArrowButton] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const COLUMN_WIDTH_WITH_MARGIN = 432;

  const handleScroll = useCallback(() => {
    setScrollPosition(tableRef.current?.scrollLeft || 0);
  }, []);

  const scrollLeft = useCallback(() => {
    if (tableRef.current) {
      tableRef.current.scrollBy({
        top: 0,
        left: -COLUMN_WIDTH_WITH_MARGIN,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (tableRef.current) {
      tableRef.current.scrollBy({
        top: 0,
        left: COLUMN_WIDTH_WITH_MARGIN,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      setShowRightArrowButton(
        tableRef.current.scrollWidth > window.innerWidth + scrollPosition
      );
    }
  }, [scrollPosition]);

  const showLeftArrowButton = scrollPosition > 64;

  return {
    tableRef,
    showRightArrowButton,
    showLeftArrowButton,
    handleScroll,
    scrollLeft,
    scrollRight,
  };
};

export const useRequirementsDimensions = (pinnedJobs: Job[]) => {
  const [maxRequirementsH, setMaxRequirementsH] = useState(0);

  const maxRequirementsL = useMemo(() => {
    return pinnedJobs.reduce((acc, job) => {
      const requirementsLength = job.requirements?.length || 0;
      return Math.max(acc, requirementsLength);
    }, 0);
  }, [pinnedJobs]);

  return { maxRequirementsH, setMaxRequirementsH, maxRequirementsL };
};
