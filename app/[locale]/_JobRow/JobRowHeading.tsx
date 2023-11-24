import { Job } from "../../../utils";
import Image from "next/image";
import { Tooltip } from "../../../components";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import LikeButton from "./JobRowLikeButton";
import { getCustomBoard, getDictionary } from "../../../utils/server";
import { Locale } from "../../../i18n-config";

export default async function JobRowHeading({
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
    <>
      <div
        className={`flex gap-6 md:items-center ${
          customBoard?.cards ? "" : "w-full lg:w-[60%] xl:w-[65%]"
        }`}
      >
        {!customBoard?.cards && employer?.logo ? (
          <div className="block h-[52px] w-[70px] object-contain md:w-[130px] relative">
            <Image
              src={employer.logo}
              alt={`${dict["Logo of"]} ${employer?.name}`}
              className="absolute !top-[22px] md:!top-0 md:static block object-contain"
              fill
              sizes="70px, (min-width: 768px) 130px"
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col w-3/4 md:w-full">
          <h2 className="md:text-xl break-words font-title font-medium text-digitalent-green">
            {title}{" "}
            {workload && workload[0] === workload[1]
              ? `${workload[0]}%`
              : `${workload?.[0]} - ${workload?.[1]}%`}
          </h2>
          <span className="font-light text-sm hidden md:block">
            {employer?.name}

            {homeOffice?.[1]
              ? `, ${homeOffice[1]}% ${dict["Home Office"]}`
              : ""}
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-2 xl:gap-6 align-middle w-auto">
        <div className="flex flex-col pl-[95px] md:pl-0 md:flex-row md:gap-1 xl:gap-4 align-middle w-full justify-start md:justify-end md:w-auto">
          {salary?.amount && (
            <span
              className={`flex md:h-10 md:py-2 my-auto whitespace-nowrap items-baseline md:items-start ${
                customBoard?.cards ? "" : "pr-4 md:pl-4 md:w-40"
              }`}
            >
              <Tooltip
                content={dict["Yearly salary in thousands"]}
                ariaLabel="Salary"
              >
                <span className="font-title font-light text-sm md:text-base md:font-medium">
                  {salary.amount?.[0] === salary?.amount?.[1]
                    ? k(salary.amount?.[0])
                    : k(salary.amount?.[0])}
                  {" -"} {k(salary.amount?.[1])}
                  {"k " + salary?.currency}
                </span>
              </Tooltip>
              <span className="md:hidden font-title !font-lighter text-xs pl-3">
                {workload?.[1] ? ` ${workload[0]}% - ${workload[1]}%` : ""}
              </span>
              <Tooltip
                content={
                  dict[
                    "Salary slightly below or above this range is possible, depending on your skills"
                  ]
                }
                ariaLabel="Salary Range Info"
              >
                <span className="h-[1.2rem] w-[1.2rem]">
                  <InformationCircleIcon className="hidden md:block h-[1.2rem] w-[1.2rem] text-white ml-2 translate-y-1" />
                </span>
              </Tooltip>
            </span>
          )}
          {address && (
            <span className="md:px-4 md:py-2 md:w-28 md:text-right translate-y-[2px] z-10">
              <Tooltip content={dict["Location"]} ariaLabel="Location">
                <span className="font-title text-xs md:text-base md:font-medium md:leading-none inline-block w-[100px] whitespace-nowrap text-ellipsis overflow-hidden">
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
                  ariaLabel="Like"
                >
                  <LikeButton jobId={jobId} />
                </Tooltip>
              )}
        </div>
      </div>
    </>
  );
}
