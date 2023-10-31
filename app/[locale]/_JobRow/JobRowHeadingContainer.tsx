"use client";

import { ReactNode, useState } from "react";
import { Job, Locale } from "../../../utils";

export default function JobRowHeadingContainer({
  job,
  locale,
  children,
}: {
  job: Job;
  locale: Locale;
  children: ReactNode;
}) {
  const [lastOpenJobId, setLastOpenJobId] = useState<string | null>(null);

  function updateUrl() {
    if (typeof window === "undefined") return;

    if (!job.id) return;

    if (lastOpenJobId === job.id) {
      setLastOpenJobId(null);
      window.history.pushState({}, "", `/${locale}`);
      return;
    }

    setLastOpenJobId(job.id);
    window.history.pushState({}, "", `/${locale}/jobs/${job.id}`);
  }

  return (
    <div
      className="md:flex p-3 md:py-4 md:pr-8 md:pl-6 w-full justify-between cursor-pointer relative items-center"
      onClick={updateUrl}
    >
      {children}
    </div>
  );
}
