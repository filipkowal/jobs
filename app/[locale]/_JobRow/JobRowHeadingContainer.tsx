"use client";

import { ReactNode, useState } from "react";
import { CustomBoard, Job, Locale, getShortId } from "../../../utils";

export default function JobRowHeadingContainer({
  job,
  locale,
  initOpenJobTitleId,
  children,
  customBoard,
}: {
  job: Job;
  locale: Locale;
  initOpenJobTitleId?: string;
  children: ReactNode;
  customBoard: CustomBoard;
}) {
  const [lastOpenJobId, setLastOpenJobId] = useState<string | null>(null);

  function createUrlFriendlyString(str?: string) {
    if (!str) return;
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace any sequence of non-alphanumeric characters with a hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  }

  function updateUrl() {
    if (typeof window === "undefined") return;
    if (customBoard.disableDetailView) return;

    if (!job.id) return;

    // Keep the intially open job always open
    if (getShortId(initOpenJobTitleId) === getShortId(job.id)) return;

    const initialUrl = initOpenJobTitleId
      ? `/${locale}/jobs/${initOpenJobTitleId}`
      : `/${locale}`;

    if (lastOpenJobId === job.id) {
      setLastOpenJobId(null);
      window.history.pushState({}, "", initialUrl);
      return;
    }

    const jobTitleId =
      createUrlFriendlyString(job.title) + "-" + getShortId(job.id);
    setLastOpenJobId(job.id);
    window.history.pushState({}, "", `/${locale}/jobs/${jobTitleId}`);
  }

  return (
    <div
      className="md:flex p-3 md:py-4 lg:pr-8 md:pl-6 w-full justify-between cursor-pointer relative items-center"
      onClick={updateUrl}
    >
      {children}
    </div>
  );
}
