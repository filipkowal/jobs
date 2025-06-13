'use client'
import Link from "next/link";
import Button from "@/components/Button";
import { type CustomBoard, type Job, type Locale, Dictionary } from "@/utils";
import ShareJob from "./JobRowShareModal";
import SaveJob from "./SaveJob";

export default function JobActions({
  landingPageUrl,
  locale,
  jobId,
  dict,
  customBoard,
}: {
  landingPageUrl: Job["landingPageUrl"];
  locale: Locale;
  jobId?: string;
  dict: Dictionary['shareJob'] & Dictionary['JobRow'] & Dictionary['saveForLater'];
  customBoard: CustomBoard;
}) {
  return (
    <div className="flex flex-row sm:flex-col gap-4 px-4 xl:px-10 sm:items-center sm:justify-start min-w-fit xl:min-w-116">
      <Link
        href={landingPageUrl || ""}
        target={customBoard.openJLPInSameTab ? "" : "_blank"}
        className="w-full"
      >
        <Button
          type="primary"
          name="More info"
          className="w-full mt-4 text-sm sm:text-base"
        >
          {dict["More info & apply"]}
        </Button>
      </Link>

      <div className="text-center font-light text-sm hidden sm:block">
        ----- {dict.or} -----
      </div>

      <ShareJob
        locale={locale}
        jobId={jobId}
        dict={dict}
        customBoard={customBoard}
      />

      <div className="text-center font-light text-sm hidden sm:block">
        ----- {dict.or} -----
      </div>

      <SaveJob
        locale={locale}
        jobId={jobId}
        dict={dict}
        customBoard={customBoard}
      />
    </div>
  );
}
