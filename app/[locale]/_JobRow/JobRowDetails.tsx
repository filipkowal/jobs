'use client'
import { Job } from "@/utils";
import { Dictionary} from "@/utils";

export default function JobRowDetails({
  job,
  dict,
}: {
  job: Job;
  dict: Dictionary['Responsibilities'];
}) {

  const responsibilitiesSection = job?.responsibilities && (
    <div>
      <h3 className="text-xl py-4 font-medium font-title">
        {dict}
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: job?.responsibilities || "" }}
        data-testid="responsibilitiesDescription"
      />
    </div>
  );

  const Tags = () =>
    job?.tags ? (
      <div className="mt-4">
        {job?.tags.map((tag) => (
          <span
            key={tag}
            className="font-title bg-digitalent-gray-light text-digitalent-blue ring-2 ring-digitalent-green-light px-3 py-1 mr-3 mb-3 break-keep inline-block"
          >
            {tag}
          </span>
        ))}
      </div>
    ) : null;

  if (!job?.responsibilities) return null;

  return (
    <div className="p-7 bg-digitalent-gray-light text-digitalent-blue w-full relative left-0 lg:-left-28 mr-0 lg:-mr-28 ">
      <div className="pb-6">
        {responsibilitiesSection}
        <Tags />
      </div>
    </div>
  );
}
