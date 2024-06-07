"use client";

import { ReactNode, useState } from "react";
import { CustomBoard, Job, Locale, updateUrlToOpenJob } from "../../../utils";

export default function JobRowHeadingContainer({
  job,
  locale,
  initOpenJobTitleId,
  children,
  customBoard,
  isInitOpenJob,
}: {
  job: Job;
  locale: Locale;
  initOpenJobTitleId?: string;
  children: ReactNode;
  customBoard: CustomBoard;
  isInitOpenJob: () => boolean;
}) {
  const [lastOpenJobId, setLastOpenJobId] = useState<string | null>(null);

  return (
    <div
      className="md:flex p-3 md:py-4 lg:pr-8 md:pl-6 w-full justify-between cursor-pointer relative items-center"
      onClick={() =>
        updateUrlToOpenJob({
          job: { title: job?.title, id: job?.id },
          locale,
          initOpenJobTitleId,
          lastOpenJobId,
          setLastOpenJobId,
          customBoard,
          isInitOpenJob,
        })
      }
    >
      {children}
    </div>
  );
}
