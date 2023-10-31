"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import type { CustomBoard, Job, Locale } from "../../../utils";
import JobRowHeadingContainer from "./JobRowHeadingContainer";

interface JobRowProps {
  job: Job;
  children: ReactNode;
  customBoard?: CustomBoard;
  initOpenJobId?: string;
  jobRowHeading?: ReactNode;
  locale: Locale;
}

export default function JobRowAccordion({
  job,
  children,
  customBoard,
  initOpenJobId,
  jobRowHeading,
  locale,
}: JobRowProps) {
  const { id: jobId, landingPageUrl } = job;

  const [animationRef] = useAutoAnimate();

  const [isOpen, setIsOpen] = useState(
    usePathname()?.includes(job.id as string) || false
  );

  const getHref = () => {
    if (customBoard?.disableDetailView) {
      return landingPageUrl || "";
    }
  };

  return (
    <div
      className={`flex flex-col bg-digitalent-blue my-1 sm:my-2 w-full ${
        customBoard?.cards ? `h-96 justify-end` : ``
      }`}
      key={jobId}
      ref={animationRef}
    >
      <div
        onClick={() => {
          initOpenJobId !== job.id && setIsOpen(!isOpen);
          history && history.pushState(null, "", getHref());
        }}
      >
        <div
          // hash link with id scrolls here. 64px is the height of the sticky header on desktop
          className="sm:relative sm:top-[-64px]"
          id={jobId}
        />
        <JobRowHeadingContainer
          initOpenJobId={initOpenJobId}
          job={job}
          locale={locale}
        >
          {jobRowHeading}
        </JobRowHeadingContainer>
      </div>

      {isOpen ? children : null}
    </div>
  );
}
