"use client";

import { ReactNode, useState } from "react";
import { Job, Locale } from "../../../utils";

export default function JobRowHeadingContainer({
  job,
  locale,
  initiallyOpenJobId,
  children,
}: {
  job: Job;
  locale: Locale;
  initiallyOpenJobId?: string;
  children: ReactNode;
}) {
  const [lastOpenJobId, setLastOpenJobId] = useState<string | null>(null);

  function updateUrl() {
    if (typeof window === "undefined") return;

    if (!job.id) return;

    // Keep the intially open job always open
    if (initiallyOpenJobId === job.id) return;

    const initialUrl = initiallyOpenJobId
      ? `/${locale}/jobs/${initiallyOpenJobId}`
      : `/${locale}`;

    if (lastOpenJobId === job.id) {
      setLastOpenJobId(null);
      window.history.pushState({}, "", initialUrl);
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
