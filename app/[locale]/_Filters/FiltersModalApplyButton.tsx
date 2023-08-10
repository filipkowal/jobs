import { useEffect, useMemo, useState } from "react";

import {
  type CustomBoard,
  type Locale,
  type JobsQuery,
  getJobs,
} from "../../../utils";
import { Button, LoadingEllipsis } from "../../../components";
import { OpenFilterName } from "./FiltersSection";
import { useRouter } from "next/navigation";

export default function ApplyFiltersButton({
  activeFilters,
  setIsOpen,
  locale,
  dict,
  customBoard,
}: {
  activeFilters: JobsQuery;
  setIsOpen: (isOpen: OpenFilterName) => void;
  locale: Locale;
  dict: { "Apply filters": string; Apply: string };
  customBoard: CustomBoard;
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
        searchParams: {
          ...activeFilters,
          employerName: customBoard.employerNameFilter,
        },
        locale: locale,
      });
      setJobsLength(length || 0);
      setIsLoading(false);
    }
    fetchJobs();
  }, [activeFilters, locale, customBoard]);

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
      <span className="sm:hidden inline">{dict["Apply"]}</span>
      <span className="hidden sm:inline">{dict["Apply filters"]}</span>
      {` ${isLoading ? "" : `(${jobsLength})`} `}
      <LoadingEllipsis isLoading={isLoading} />
    </Button>
  );
}
