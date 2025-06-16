"use client";

import { ReactNode } from "react";
import { CustomBoard, Job, Locale, updateUrlToOpenJob } from "@/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function JobRowHeadingContainer({
  job,
  locale,
  children,
  customBoard,
  isInitOpenJob,
}: {
  job: Job;
  locale: Locale;
  children: ReactNode;
  customBoard: CustomBoard;
  isInitOpenJob: () => boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      className="md:flex p-3 md:py-4 lg:pr-8 md:pl-6 w-full justify-between cursor-pointer relative items-center"
      onClick={() =>
        updateUrlToOpenJob({
          job: { title: job?.title, id: job?.id },
          locale,
          customBoard,
          isInitOpenJob,
          pathname,
          searchParams,
        })
      }
    >
      {children}
    </div>
  );
}
