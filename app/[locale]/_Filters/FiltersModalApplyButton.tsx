import { Dispatch, SetStateAction, useEffect, useState, useCallback, useMemo } from "react";

import type { Dictionary, CustomBoard, Locale, ActiveFilters } from "@/utils";
import { getFilteredJobs } from "@/utils";
import { Button, LoadingEllipsis } from "@/components";
import { useRouter } from "next/navigation";
import { useActiveFiltersURL } from "@/utils/hooks";
import toast from "react-hot-toast";
import { captureException } from "@sentry/browser";

export default function ApplyFiltersButton({
  activeFilters,
  setIsModalOpen,
  locale,
  dict,
  customBoard,
}: {
  activeFilters: ActiveFilters | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  locale: Locale;
  dict: Dictionary["filtersSection"];
  customBoard: CustomBoard;
}) {
  const router = useRouter();
  const [jobsLength, setJobsLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFiltersCache, setEmptyFiltersCache] = useState<Record<string, number>>({});
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const THROTTLE_MS = 200;

  const activeFiltersURL = useActiveFiltersURL(activeFilters, locale);
  
  const isEmptyFilters = useMemo(() => {
    return !activeFilters || Object.keys(activeFilters).length === 0;
  }, [activeFilters]);

  useEffect(() => {
    const now = Date.now();
    if (now - lastRequestTime < THROTTLE_MS) {
      return;
    }
    console.log(now - lastRequestTime)

    // Check cache only for empty filters
    if (isEmptyFilters && emptyFiltersCache[locale] !== undefined) {
      console.log("Cache: ", emptyFiltersCache[locale]);
      setJobsLength(emptyFiltersCache[locale]);
      return;
    }

    setLastRequestTime(now);
    setIsLoading(true);

    getFilteredJobs({
      searchParams: {
        ...activeFilters,
      },
      locale: locale,
    })
      .then(async (jobsResponse) => {
        const { filteredLength } = await jobsResponse.json();
        const length = filteredLength || 0;
        
        // Cache the result only for empty filters
        if (isEmptyFilters) {
          setEmptyFiltersCache(prev => ({
            ...prev,
            [locale]: length
          }));
        }
        setJobsLength(length);
      })
      .catch((e) => {
        toast.error(dict["Something went wrong"]);
        captureException(e, { extra: { activeFilters, locale } });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeFilters, locale, dict, isEmptyFilters, lastRequestTime, emptyFiltersCache]);

  return (
    <Button
      onClick={() => {
        setIsModalOpen(false);
        router.push(activeFiltersURL);
      }}
      disabled={isLoading || jobsLength === 0}
      name="Apply filters"
      type="primary"
    >
      <span className="sm:hidden inline">{dict["Apply"]}</span>
      <span className="hidden sm:inline">{dict["Apply filters"]}</span>
      {` ${isLoading ? "" : `(${jobsLength})`}`}
      <LoadingEllipsis isLoading={isLoading} />
    </Button>
  );
}
