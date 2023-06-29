import { Dispatch, SetStateAction } from "react";
import { Job } from "../../../utils";
import { Button, Checkbox } from "../../../components";

export default function ApplicationFormBasket({
  setStepNumber,
  stepNumber,
  jobsCompared,
  likedJobs,
  applicationBasket,
  setApplicationBasket,
  dict,
}: {
  setStepNumber: Dispatch<SetStateAction<number>>;
  stepNumber: number;
  jobsCompared: string[];
  likedJobs: Job[];
  applicationBasket: string[];
  setApplicationBasket: Dispatch<SetStateAction<string[]>>;
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
      {jobsCompared.map((jobId) => {
        const job = likedJobs.find((job) => job.id === jobId);
        if (!job?.id) return null;

        return (
          <label key={job?.id} className="flex flex-row flex-nowrap gap-4">
            <Checkbox
              name={job?.title || ""}
              checked={applicationBasket.includes(job.id)}
              onChange={(e) => {
                if (e.target.checked && job.id) {
                  setApplicationBasket([...applicationBasket, job.id]);
                } else {
                  setApplicationBasket(
                    applicationBasket.filter((id) => id !== job.id)
                  );
                }
              }}
            />
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-lg">
                  {job?.title}, {job.employer?.name}
                </h3>
              </div>
            </div>
          </label>
        );
      })}
      <Button
        type="primary"
        disabled={applicationBasket.length === 0}
        className="mt-8"
        name="Apply for jobs"
        submitType
      >
        {dict["Apply for"]} {applicationBasket.length} {dict["jobs"]}
      </Button>
    </form>
  );
}
