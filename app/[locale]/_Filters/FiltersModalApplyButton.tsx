import { useEffect, useMemo, useState } from "react";

import { getJobs, JobsQuery, Locale, removeEmptyFilters } from "../../../utils";
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

  const nonEmptyActiveFilters = useMemo(
    () => removeEmptyFilters(activeFilters),
    [activeFilters]
  );

  const newSearchParams = useMemo(() => {
    const searchParams = new URLSearchParams();

    for (const key in nonEmptyActiveFilters) {
      const value = nonEmptyActiveFilters[key];

      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }

    return searchParams;
  }, [nonEmptyActiveFilters]);

  const anyActiveFilters =
    nonEmptyActiveFilters && Object.keys(nonEmptyActiveFilters).length > 0;

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
