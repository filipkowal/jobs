"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
// import { useAutoAnimate } from "@formkit/auto-animate/react";

import { getShortId } from "@/utils";
import type { CustomBoard, Dictionary, Job, Locale } from "@/utils";
import JobRowHeadingContainer from "./JobRowHeadingContainer";
import JobRowDetails from "./JobRowDetails";
import JobActions from "./JobRowActions";

interface JobRowProps {
  job: Job;
  customBoard: CustomBoard;
  initOpenJobTitleId?: string;
  jobRowHeading?: ReactNode;
  locale: Locale;
  dict: Dictionary["JobRow"] &
    Dictionary["shareJob"] &
    Dictionary["saveForLater"];
}

export default function JobRowAccordion({
  job,
  customBoard,
  initOpenJobTitleId,
  jobRowHeading,
  locale,
  dict,
}: JobRowProps) {
  const { id: jobId, landingPageUrl } = job;

  // @fixme: the animation is causing a scroll to top on close
  // const [animationRef] = useAutoAnimate();

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(
    pathname?.includes(getShortId(job.id)) || false
  );

  const isInitOpenJob = () =>
    getShortId(initOpenJobTitleId) === getShortId(job.id);

  return (
    <article
      className={`flex flex-col bg-digitalent-blue my-1 sm:my-2 w-full ${
        customBoard?.cards ? `h-96 justify-end` : ``
      }`}
      key={jobId}
      // ref={animationRef}
      data-testid="job-row-accordion"
      style={{ backgroundColor: customBoard?.colors.jobRowBackground }}
    >
      <div
        onClick={() => {
          // If detail view is disabled, open the landing page
          if (customBoard?.disableDetailView) {
            window.open(landingPageUrl, "_blank");
            return;
          }

          // If it's the initially open job, neither close nor open
          if (isInitOpenJob()) {
            return;
          }

          setIsOpen(!isOpen);
          return;
        }}
      >
        <JobRowHeadingContainer
          job={job}
          locale={locale}
          customBoard={customBoard}
          isInitOpenJob={isInitOpenJob}
        >
          {jobRowHeading}
        </JobRowHeadingContainer>
      </div>

      {!customBoard?.disableDetailView && isOpen ? (
        <div className="flex flex-row flex-wrap-reverse lg:flex-nowrap justify-center sm:pb-6 bg-digitalent-gray-light sm:bg-inherit">
          <JobRowDetails dict={dict["Responsibilities"]} job={job} />

          <JobActions
            landingPageUrl={job.landingPageUrl}
            locale={locale}
            jobId={job.id}
            dict={dict}
            customBoard={customBoard}
          />
        </div>
      ) : null}
    </article>
  );
}
