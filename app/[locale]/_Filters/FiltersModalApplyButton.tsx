import { useEffect, useMemo, useState } from "react";

import { getJobs, JobsQuery, Locale } from "../../../utils";
import { Button, LoadingEllipsis } from "../../../components";
import { OpenFilterName } from "./FiltersSection";
import { useRouter } from "next/navigation";

export default function ApplyFiltersButton({
  activeFilters,
  setIsOpen,
  locale,
  dict,
}: {
  activeFilters: JobsQuery;
  setIsOpen: (isOpen: OpenFilterName) => void;
  locale: Locale;
  dict: { "Apply filters": string };
}) {
  const router = useRouter();
  const [jobsLength, setJobsLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const anyActiveFilters =
    activeFilters && Object.keys(activeFilters).length > 0;

  useEffect(() => {
    setIsLoading(true);
    async function fetchJobs() {
      const { length } = await getJobs({
        searchParams: activeFilters,
        locale: locale,
      });
      setJobsLength(length || 0);
      setIsLoading(false);
    }
    fetchJobs();
  }, [activeFilters, locale]);

  return (
    <Button
      onClick={() => {
        setIsOpen("");
        anyActiveFilters
          ? router.push(`/${locale}/filtered?${newSearchParams.toString()}`)
          : router.push(`/${locale}`);
      }}
      disabled={isLoading || jobsLength === 0}
      name="Apply filters"
      type="primary"
    >
      {`${dict["Apply filters"]} ${isLoading ? "" : `(${jobsLength})`} `}
      <LoadingEllipsis isLoading={isLoading} />
    </Button>
  );
}
