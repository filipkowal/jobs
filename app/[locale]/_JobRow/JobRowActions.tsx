import Link from "next/link";
import Button from "@/components/Button";
import { type CustomBoard, type Job, type Locale } from "@/utils";
import ShareJob from "./JobRowShareModal";
import SaveJob from "./SaveJob";
import { getDictionary } from "@/utils/server";

export default async function JobActions({
  landingPageUrl,
  locale,
  jobId,
  customBoard,
}: {
  landingPageUrl: Job["landingPageUrl"];
  locale: Locale;
  jobId?: string;
  customBoard: CustomBoard;
}) {
  const { shareJob, ...dict } = await getDictionary(locale);

  return (
    <div className="flex flex-row sm:flex-col gap-4 px-4 xl:px-10 sm:items-center sm:justify-start min-w-fit xl:min-w-[29rem]">
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
        dict={{
          ...shareJob,
          "Something went wrong": dict["Something went wrong"],
          "Go back": dict["Go back"],
          "Share this job and earn 500 CHF":
            dict["Share this job and earn 500 CHF"],
          invalidEmail: dict["invalidEmail"],
        }}
      />

      <div className="text-center font-light text-sm hidden sm:block">
        ----- {dict.or} -----
      </div>

      <SaveJob
        locale={locale}
        jobId={jobId}
        dict={{ invalidEmail: dict.invalidEmail, ...dict.saveForLater }}
      />
    </div>
  );
}
