import Image from "next/image";
import Checkbox from "../../../components/Checkbox";
import { Job } from "../../../utils";

export default function JobColumn({
  job,
  applicationBasket,
  setApplicationBasket,
  dict,
}: {
  job: Job;
  applicationBasket: string[];
  setApplicationBasket: (applicationBasket: string[]) => void;
  dict: {
    "Add to application basket": string;
    Workload: string;
    "Work location": string;
    "Home Office": string;
    "You have": string;
    Responsibilities: string;
  };
}) {
  return (
    <div className="flex flex-col gap-8 sm:px-8 px-4 sm:py-16 py-6 bg-digitalent-blue h-auto sm:min-w-[25rem] max-w-xl">
      {typeof job.id === "string" && (
        <label>
          <Checkbox
            inverse
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
          <span className="text-xl">{dict["Add to application basket"]}</span>
        </label>
      )}
      {job?.employer?.logo && (
        <Image
          src={job?.employer?.logo}
          alt={job?.employer?.name || "logo"}
          className="block object-contain"
          width={130}
          height={52}
        />
      )}
      <h1 className="text-3xl font-title font-medium text-digitalent-green sm:h-[100px]">
        {job.title}
      </h1>
      <h2 className="text-xl font-light">
        {job.salary?.amount?.[0]} - {job.salary?.amount?.[1]}{" "}
        {job.salary?.currency}
      </h2>
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
          {job.homeOffice?.[1] && job.homeOffice[1] > 0
            ? `, ${job.homeOffice?.[1]}% ${dict["Home Office"]}`
            : ""}
        </p>
      </div>
      {job.requirements && (
        <div className="sm:h-[750px] overflow-auto">
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
