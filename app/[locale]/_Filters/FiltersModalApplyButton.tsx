import { Dispatch, SetStateAction, useEffect, useState } from "react";

import type { Dictionary, CustomBoard, Locale, JobsQuery } from "@/utils";
import { getJobs } from "@/utils";
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
  activeFilters: JobsQuery | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  locale: Locale;
  dict: Dictionary["filtersSection"];
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
          customBoardId: customBoard?.id,
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
  }, [activeFilters, locale, customBoard, dict]);

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
