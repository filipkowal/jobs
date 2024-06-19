"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { getShortId } from "@/utils";
import type { CustomBoard, Job, Locale } from "@/utils";
import JobRowHeadingContainer from "./JobRowHeadingContainer";

interface JobRowProps {
  job: Job;
  children: ReactNode;
  customBoard: CustomBoard;
  initOpenJobTitleId?: string;
  jobRowHeading?: ReactNode;
  locale: Locale;
}

export default function JobRowAccordion({
  job,
  children,
  customBoard,
  initOpenJobTitleId,
  jobRowHeading,
  locale,
}: JobRowProps) {
  const { id: jobId, landingPageUrl } = job;

  const [animationRef] = useAutoAnimate();

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
      ref={animationRef}
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
          initOpenJobTitleId={initOpenJobTitleId}
          job={job}
          locale={locale}
          customBoard={customBoard}
          isInitOpenJob={isInitOpenJob}
        >
          {jobRowHeading}
        </JobRowHeadingContainer>
      </div>

      {isOpen ? children : null}
    </article>
  );
}
