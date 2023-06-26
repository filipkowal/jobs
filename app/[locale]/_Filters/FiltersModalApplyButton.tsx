import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { getJobs, JobsQuery, Locale, removeEmptyFilters } from "../../../utils";
import { OpenFilterName } from "./FiltersModalContext";
import { Button, LoadingEllipsis } from "../../../components";

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
  const [jobsLength, setJobsLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const nonEmptyActiveFilters = useMemo(
    () => removeEmptyFilters(activeFilters),
    [activeFilters]
  );

  useEffect(() => {
    setIsLoading(true);
    async function fetchJobs() {
      const { length } = await getJobs({
        searchParams: nonEmptyActiveFilters,
        locale: locale,
      });
      setJobsLength(length || 0);
      setIsLoading(false);
    }
    fetchJobs();
  }, [nonEmptyActiveFilters, locale]);

  return (
    <Link
      href={
        jobsLength > 0
          ? {
              query: nonEmptyActiveFilters,
              pathname: locale,
            }
          : ""
      }
      data-testid="apply-filters-button"
    >
      <Button
        onClick={() => {
          setIsOpen("");
        }}
        disabled={isLoading || jobsLength === 0}
        name="Apply filters"
        type="primary"
      >
        {`${dict["Apply filters"]} ${isLoading ? "" : `(${jobsLength})`} `}
        <LoadingEllipsis isLoading={isLoading} />
      </Button>
    </Link>
  );
}
