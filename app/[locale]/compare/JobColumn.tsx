import Image from "next/image";
import { CustomBoard, Job } from "../../../utils";
import { Tooltip } from "../../../components";
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
  dict: {
    "Add to application basket": string;
    Workload: string;
    "Work location": string;
    "Home Office": string;
    "You have": string;
    Responsibilities: string;
    Unpin: string;
  };
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

  return (
    <div className="flex flex-col gap-8 sm:px-8 px-4 sm:py-16 py-6 bg-digitalent-blue h-auto sm:min-w-[25rem] max-w-xl">
      <div className="flex justify-between">
        {job?.employer?.logo && (
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
      {!customBoard.hiddenJobData?.salary && (
        <h2 className="text-xl font-light">
          {job.salary?.amount?.[0]} - {job.salary?.amount?.[1]}{" "}
          {job.salary?.currency}
        </h2>
      )}
      <div>
        <h3 className="font-light text-xl mb-2">{dict["Workload"]}</h3>
        <p>
          {job.workload?.[0]} - {job.workload?.[1]}%
        </p>
      </div>
      <div className="sm:h-20">
        <h3 className="font-light text-xl mb-2">{dict["Work location"]}</h3>
        <p>
          {job.address?.city}
          {job.homeOffice?.[1] &&
          job.homeOffice[1] > 0 &&
          !customBoard.hiddenJobData?.homeOffice
            ? `, ${job.homeOffice?.[1]}% ${dict["Home Office"]}`
            : ""}
        </p>
      </div>
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
