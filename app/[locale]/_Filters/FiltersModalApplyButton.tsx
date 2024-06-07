import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import {
  type CustomBoard,
  type Locale,
  type JobsQuery,
  getJobs,
} from "../../../utils";
import { Button, LoadingEllipsis } from "../../../components";
import { useRouter } from "next/navigation";
import { useActiveFiltersURL } from "../../../utils/hooks";
import toast from "react-hot-toast";
import { captureException } from "@sentry/browser";

export default function ApplyFiltersButton({
  activeFilters,
  setIsModalOpen,
  locale,
  dict,
  customBoard,
}: {
  activeFilters: JobsQuery;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  locale: Locale;
  dict: {
    "Apply filters": string;
    Apply: string;
    "Something went wrong": string;
  };
  customBoard: CustomBoard;
}) {
  const router = useRouter();
  const [jobsLength, setJobsLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const activeFiltersURL = useActiveFiltersURL(activeFilters, locale);

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const { length } = await getJobs({
          searchParams: {
            ...activeFilters,
          },
          locale: locale,
        });

        setJobsLength(length || 0);
      } catch (e) {
        toast.error(dict["Something went wrong"]);
        captureException(e, { extra: { activeFilters, locale } });
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, [activeFilters, locale, customBoard]);

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
      {` ${isLoading ? "" : `(${jobsLength})`} `}
      <LoadingEllipsis isLoading={isLoading} />
    </Button>
  );
}
