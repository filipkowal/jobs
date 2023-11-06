import { Dispatch, SetStateAction } from "react";
import { Job } from "../../../utils";
import { Button, Checkbox, Tooltip } from "../../../components";
import LikeButton from "../_JobRow/JobRowLikeButton";

export default function ApplicationFormBasket({
  setStepNumber,
  stepNumber,
  likedJobs,
  removeLikedJob,
  dict,
}: {
  setStepNumber: Dispatch<SetStateAction<number>>;
  stepNumber: number;
  likedJobs: Job[];
  removeLikedJob: (jobId: string) => void;
  dict: { "You are applying for": string; "Apply for": string; jobs: string };
}) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setStepNumber(stepNumber + 1);
      }}
      data-testid="applicationBasket"
    >
      <h3>{dict["You are applying for"]}:</h3>
      <ul>
        {likedJobs.map((job) => {
          if (!job?.id) return null;

          return (
            <li key={job.id} className="text-lg mt-4">
              <div className="flex gap-4">
                <span>
                  {job?.title}, {job.employer?.name}
                </span>
                <Tooltip content="Remove" ariaLabel="Remove">
                  <svg
                    className="w-6 h-6 cursor-pointer fill-digitalent-green"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => removeLikedJob(job.id as string)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Tooltip>
              </div>
            </li>
          );
        })}
      </ul>
      <Button
        type="primary"
        disabled={likedJobs.length === 0}
        className="mt-8"
        name="Apply for jobs"
        submitType
      >
        {dict["Apply for"]} {likedJobs.length} {dict["jobs"]}
      </Button>
    </form>
  );
}
