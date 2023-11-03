"use client";
import { ReactNode, use, useState } from "react";
import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import {
  getShortId,
  type CustomBoard,
  type Job,
  type Locale,
} from "../../../utils";
import JobRowHeadingContainer from "./JobRowHeadingContainer";

interface JobRowProps {
  job: Job;
  children: ReactNode;
  customBoard?: CustomBoard;
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

  const getHref = () => {
    if (customBoard?.disableDetailView) {
      return landingPageUrl || "";
    }
  };

  const isNotInitOpenJob = () =>
    getShortId(initOpenJobTitleId) !== getShortId(job.id);

  return (
    <article
      className={`flex flex-col bg-digitalent-blue my-1 sm:my-2 w-full ${
        customBoard?.cards ? `h-96 justify-end` : ``
      }`}
      key={jobId}
      ref={animationRef}
    >
      <div
        onClick={() => {
          isNotInitOpenJob() && setIsOpen(!isOpen);
          history && history.pushState(null, "", getHref());
        }}
      >
        <div
          // hash link with id scrolls here. 64px is the height of the sticky header on desktop
          className="sm:relative sm:top-[-64px]"
          id={jobId}
        />
        <JobRowHeadingContainer
          initOpenJobTitleId={initOpenJobTitleId}
          job={job}
          locale={locale}
        >
          {jobRowHeading}
        </JobRowHeadingContainer>
      </div>

      {isOpen ? children : null}
    </article>
  );
}
