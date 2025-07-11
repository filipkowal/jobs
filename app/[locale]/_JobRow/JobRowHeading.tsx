import { Job, k } from "@/utils";
import Image from "next/image";
import { Tooltip } from "@/components";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import LikeButton from "./JobRowLikeButton";
import { getCustomBoard, getDictionary } from "@/utils/server";
import { Locale } from "@/i18n-config";

export default async function JobRowHeading({
  job,
  locale,
}: {
  job: Job;
  locale: Locale;
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
  const hidden = customBoard.hiddenJobData;

  function getEmployerNameAndHomeOffice() {
    let strArr = [];
    if (!hidden.employerName && employer?.name) {
      strArr.push(employer.name);
    }
    if (homeOffice?.[1] && !hidden.homeOffice) {
      strArr.push(`${homeOffice[1]}% ${dict["homeOffice"]}`);
    }
    return strArr.join(", ");
  }

  return (
    <>
      <div
        className={`flex gap-6 md:items-center ${
          customBoard?.cards ? "" : "w-full lg:w-[60%] xl:w-[65%]"
        }`}
      >
        {!customBoard?.cards && employer?.logo && !hidden.logo ? (
          <div className="block h-[52px] w-[70px] object-contain md:w-[130px] relative">
            <Image
              src={employer.logo}
              alt={`${dict["Logo of"]} ${employer?.name}`}
              className="absolute top-[22px]! md:top-0! md:static block object-contain"
              fill
              sizes="(min-width: 768px) 130px, 70px"
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col w-3/4 md:w-full">
          <h2
            className="md:text-xl break-words font-title font-medium text-digitalent-green"
            style={{ color: customBoard.colors.jobRowTitle }}
          >
            {title}{" "}
            <span className="hidden sm:inline-block">
              {workload && workload[0] === workload[1]
                ? `${workload[0]}%`
                : `${workload?.[0]} - ${workload?.[1]}%`}
            </span>
          </h2>
          <span className="font-light text-sm hidden md:block">
            {getEmployerNameAndHomeOffice()}
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-2 xl:gap-6 align-middle w-auto">
        <div className="flex flex-col pl-[95px] md:pl-0 md:flex-row md:gap-1 xl:gap-4 align-middle w-full justify-start md:justify-end md:w-auto">
          {salary?.amount && !hidden.salary && (
            <span
              className={`flex md:h-10 md:py-2 my-auto whitespace-nowrap items-baseline md:items-start ${
                customBoard?.cards ? "" : "pr-4 md:pl-4 md:w-40"
              }`}
            >
              <span className="font-title font-light text-sm md:text-base md:font-medium">
                {salary.amount?.[0] === salary?.amount?.[1]
                  ? k(salary.amount?.[0])
                  : k(salary.amount?.[0])}
                {" -"} {k(salary.amount?.[1])}
                {"k " + salary?.currency}
              </span>
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
                  <InformationCircleIcon className="hidden md:block h-[1.2rem] w-[1.2rem] text-white ml-2 translate-y-[2.5px]" />
                </span>
              </Tooltip>
            </span>
          )}
          {(address?.city || address?.country) && !hidden.address && (
            <span className="md:px-4 md:pt-2 md:pb-1 md:w-28 md:text-right translate-y-[2px] z-10">
              <Tooltip
                content={address?.city || address?.country || ""}
                ariaLabel="address"
              >
                <span
                  className="font-title text-xs md:text-base md:font-medium inline-block w-[100px] whitespace-nowrap text-ellipsis overflow-hidden"
                  title={address.city}
                >
                  {`${address?.city || address?.country}`}
                </span>
              </Tooltip>
            </span>
          )}
        </div>
        <div className="hidden sm:flex items-center pb-1">
          {customBoard?.disableCompareView
            ? null
            : jobId && (
                <Tooltip
                  content={dict["Like 2 or more jobs to compare"]}
                  ariaLabel="Like"
                >
                  <LikeButton jobId={jobId} customBoard={customBoard} />
                </Tooltip>
              )}
        </div>
      </div>
    </>
  );
}
