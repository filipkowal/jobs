"use client";
import { useState } from "react";
import Button from "@/components/Button";
import { type CustomBoard, type Job, type Locale } from "@/utils";
import { Dictionary } from "@/utils/server";
import {
  usePinnedJobs,
  useScrollJobTable,
  useRequirementsDimensions,
} from "@/utils/hooks";
import ApplicationFormModal from "./ApplicationFormModal";
import JobColumn from "./JobColumn";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

export default function CompareJobTable({
  jobs,
  locale,
  dict,
  customBoard,
}: {
  jobs: Job[];
  locale: Locale;
  dict: Dictionary["compareJobTable"];
  customBoard: CustomBoard;
}) {
  const { pinnedJobs, removePinnedJob, pinnedJobsIds } = usePinnedJobs(jobs);

  const {
    showLeftArrowButton,
    showRightArrowButton,
    scrollLeft,
    scrollRight,
    tableRef,
    handleScroll,
  } = useScrollJobTable();

  const { maxRequirementsH, setMaxRequirementsH, maxRequirementsL } =
    useRequirementsDimensions(pinnedJobs);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ApplicationFormModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        locale={locale}
        pinnedJobs={pinnedJobs}
        removePinnedJob={removePinnedJob}
        dict={dict}
      />

      <div className="w-full flex justify-center sm:mt-16">
        <Button
          type="primary"
          className="mt-4 w-96 fixed max-sm:bottom-0 sm:top-14 z-10"
          disabled={pinnedJobsIds.length === 0}
          onClick={() => setIsModalOpen(true)}
          name="apply for jobs"
        >
          {dict["Apply for"]} <b>{pinnedJobsIds.length}</b>{" "}
          {pinnedJobs.length > 1 ? dict["jobs"] : dict["job"]}
        </Button>
      </div>

      <div
        className="max-w-screen flex flex-col sm:flex-row sm:gap-12 gap-6 sm:p-8 overflow-y-visible h-auto overflow-x-scroll scrollbar-hide"
        ref={tableRef}
        onScroll={handleScroll}
      >
        <ArrowButtons
          showLeftArrowButton={showLeftArrowButton}
          showRightArrowButton={showRightArrowButton}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
        />
        {pinnedJobs.map((job) => (
          <JobColumn
            key={job.id}
            job={job}
            dict={dict}
            customBoard={customBoard}
            maxRequirementsHeight={maxRequirementsH}
            setMaxRequirementsHeight={setMaxRequirementsH}
            longestRequirementsLengths={maxRequirementsL}
          />
        ))}
      </div>
    </>
  );
}

function ArrowButtons({
  showLeftArrowButton,
  showRightArrowButton,
  scrollLeft,
  scrollRight,
}: {
  showLeftArrowButton: boolean;
  showRightArrowButton: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}) {
  return (
    <>
      {showLeftArrowButton && (
        <button
          className="fixed left-4 top-1/2 text-digitalent-green hidden sm:block"
          onClick={scrollLeft}
          name="scroll left"
        >
          <div className="relative">
            <div className="bg-white h-8 w-8 xl:h-16 xl:w-16 rounded-full absolute top-4 left-4 z-0" />
            <ArrowLeftCircleIcon className="h-16 w-16 xl:h-24 xl:w-24 relative z-10" />
          </div>
        </button>
      )}
      {showRightArrowButton && (
        <button
          className="fixed right-4 top-1/2 text-digitalent-green hidden sm:block"
          onClick={scrollRight}
          name="scroll right"
        >
          <div className="relative">
            <div className="bg-white h-8 w-8 xl:h-16 xl:w-16 rounded-full absolute top-4 left-4 z-0" />
            <ArrowRightCircleIcon className="h-16 w-16 xl:h-24 xl:w-24 relative z-10" />
          </div>
        </button>
      )}
    </>
  );
}
