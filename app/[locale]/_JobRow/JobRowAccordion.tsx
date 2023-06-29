"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import type { CustomBoard, Job, Locale } from "../../../utils";

interface JobRowProps {
  job: Job;
  params: { locale: Locale };
  children: ReactNode;
  openJobId?: string;
  customBoard?: CustomBoard;
  headingDesktop?: ReactNode;
  headingMobile?: ReactNode;
}

export default function JobRowAccordion({
  job,
  params,
  children,
  customBoard,
  openJobId,
  headingDesktop,
  headingMobile,
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

    // @fixme add individual job page

    // if (openJobId === jobId || isOpen) {
    //   return `/${params.locale}`;
    // }

    // return `/${params.locale}${`/${jobId}`}#${jobId}`;
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
          setIsOpen(!isOpen);
          history && history.pushState(null, "", getHref());
        }}
      >
        <div
          // hash link with id scrolls here. 64px is the height of the sticky header on desktop
          className="sm:relative sm:top-[-64px]"
          id={jobId}
        />
        {headingDesktop}

        {headingMobile}
      </div>

      {isOpen ? children : null}
    </div>
  );
}
