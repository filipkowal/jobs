import { Job } from "../../../utils";
import Image from "next/image";
import { Tooltip } from "../../../components";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import LikeButton from "./JobRowLikeButton";
import { getCustomBoard } from "../../../utils";
import { getDictionary } from "../../../utils/server";
import { Locale } from "../../../i18n-config";

export default async function JobRowDesktop({
  job,
  locale,
  k,
}: {
  job: Job;
  locale: Locale;
  k: (s?: string | number) => number | undefined;
}) {
  const {
    id: jobId,
    employer,
    address,
    title,
    workload,
    homeOffice,
    salary,
  } = job;

  const dict = await getDictionary(locale);
  const customBoard = await getCustomBoard();

  return (
    <div className="hidden sm:flex pt-4 pb-4 px-3 sm:pr-8 sm:pl-6 w-full justify-between cursor-pointer flex-wrap relative items-center">
      <div
        className={`flex gap-6 items-center ${
          customBoard?.cards ? "" : "w-full lg:w-[60%] xl:w-[65%]"
        }`}
      >
        {!customBoard?.cards && employer?.logo ? (
          <Image
            src={employer.logo}
            alt={`${dict["Logo of"]} ${employer?.name}`}
            className="block h-[52px] object-contain md:w-[130px] w-24"
            width={130}
            height={52}
          />
        ) : (
          ""
        )}
        <div className="flex flex-col w-3/4 md:w-full">
          <h2 className="text-xl break-words font-title font-medium text-digitalent-green">
            {title}{" "}
            {workload && workload[0] === workload[1]
              ? `${workload[0]}%`
              : `${workload?.[0]} - ${workload?.[1]}%`}
          </h2>
          <span className="font-light text-sm hidden sm:block">
            {employer?.name}

            {homeOffice?.[1]
              ? `, ${homeOffice[1]}% ${dict["Home Office"]}`
              : ""}
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-2 xl:gap-6 align-middle w-auto">
        <div className="flex flex-row-reverse sm:flex-row gap-1 xl:gap-4 align-middle w-full justify-start sm:justify-end sm:w-auto">
          {salary?.amount && (
            <span
              className={`h-10 py-2 my-auto whitespace-nowrap ${
                customBoard?.cards ? "" : "pr-4 sm:pl-4 md:w-40"
              }`}
            >
              <Tooltip
                content={dict["Yearly salary in thousands"]}
                name="Salary"
                side="bottom"
              >
                <span className="font-title font-medium">
                  {salary.amount?.[0] === salary?.amount?.[1]
                    ? k(salary.amount?.[0])
                    : k(salary.amount?.[0])}
                  {" -"} {k(salary.amount?.[1])}
                  {"k " + salary?.currency}
                </span>
              </Tooltip>
              <Tooltip
                side="bottom"
                content={
                  dict[
                    "Salary slightly below or above this range is possible, depending on your skills"
                  ]
                }
                name="Salary Range Info"
              >
                <InformationCircleIcon className="hidden sm:block h-[1.2rem] w-[1.2rem] text-white ml-2 translate-y-1" />
              </Tooltip>
            </span>
          )}
          {address && (
            <span className="px-4 py-2 md:w-28 text-right">
              <Tooltip side="bottom" content={dict["Location"]} name="Location">
                <span className="font-title font-medium">
                  {`${address?.city || address?.country}`}
                </span>
              </Tooltip>
            </span>
          )}
        </div>
        <div className="hidden sm:block">
          {customBoard?.disableCompareView
            ? null
            : jobId && (
                <Tooltip
                  content={dict["Like 2 or more jobs to compare"]}
                  name="Like"
                  side="bottom"
                >
                  <LikeButton jobId={jobId} />
                </Tooltip>
              )}
        </div>
      </div>
    </div>
  );
}
