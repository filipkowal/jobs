import Image from "next/image";
import { CustomBoard, Dictionary, Job } from "@/utils";
import { Tooltip } from "@/components";
import LikeButton from "../_JobRow/JobRowLikeButton";
import { useEffect, useRef } from "react";

export default function JobColumn({
  job,
  dict,
  customBoard,
  maxRequirementsHeight,
  setMaxRequirementsHeight,
  longestRequirementsLengths,
}: {
  job: Job;
  customBoard: CustomBoard;
  maxRequirementsHeight: number;
  setMaxRequirementsHeight: (height: number) => void;
  longestRequirementsLengths: number;
  dict: Dictionary["compareJobTable"];
}) {
  const requirementsRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (requirementsRef.current) {
      const height = requirementsRef.current.offsetHeight;
      if (height > maxRequirementsHeight) {
        setMaxRequirementsHeight(height);
      }
    }
  }, [job, maxRequirementsHeight, setMaxRequirementsHeight]);

  const hidden = customBoard.hiddenJobData || {};

  function getCityAndHomeOffice() {
    let cityAndHomeOffice = [];
    if (!hidden.address) {
      cityAndHomeOffice.push(job.address?.city);
    }
    if (job.homeOffice?.[1] && !hidden.homeOffice) {
      cityAndHomeOffice.push(`${job.homeOffice?.[1]}% ${dict["homeOffice"]}`);
    }
    return cityAndHomeOffice.join(", ");
  }

  return (
    <div className="flex flex-col gap-8 sm:px-8 px-4 sm:py-16 py-6 bg-digitalent-blue h-auto sm:min-w-100 max-w-xl">
      <div className="flex justify-between">
        {job?.employer?.logo && !hidden.logo && (
          <Image
            src={job?.employer?.logo}
            alt={job?.employer?.name || "logo"}
            className="block object-contain"
            width={130}
            height={52}
          />
        )}
        {job.id && (
          <Tooltip content={dict["Unpin"]} ariaLabel="dict['Unpin']">
            <LikeButton jobId={job.id} customBoard={customBoard} />
          </Tooltip>
        )}
      </div>
      <h1 className="text-3xl font-title font-medium text-digitalent-green sm:h-[100px]">
        {job.title}
      </h1>
      {!hidden?.salary && (
        <h2 className="text-xl font-light">
          {job.salary?.amount?.[0]} - {job.salary?.amount?.[1]}{" "}
          {job.salary?.currency}
        </h2>
      )}
      <div>
        <h3 className="font-light text-xl mb-2">{dict["workload"]}</h3>
        <p>
          {job.workload?.[0]} - {job.workload?.[1]}%
        </p>
      </div>
      {!hidden.address && (
        <div className="sm:h-20">
          <h3 className="font-light text-xl mb-2">{dict["Work location"]}</h3>
          <p>{getCityAndHomeOffice()}</p>
        </div>
      )}
      {job.requirements && (
        <div
          className={`overflow-auto`}
          ref={requirementsRef}
          style={{
            height:
              longestRequirementsLengths > job.requirements.length
                ? maxRequirementsHeight
                : "auto",
          }}
        >
          <h3 className="font-light text-xl mb-2">{dict["You have"]}</h3>
          <p dangerouslySetInnerHTML={{ __html: job.requirements }} />
        </div>
      )}
      {job.responsibilities && (
        <div>
          <h3 className="font-light text-xl mb-2">
            {dict["Responsibilities"]}
          </h3>
          <p dangerouslySetInnerHTML={{ __html: job.responsibilities }} />
        </div>
      )}
    </div>
  );
}
