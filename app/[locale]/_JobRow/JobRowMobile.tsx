import Image from "next/image";
import { Job, Locale } from "../../../utils";
import { getCustomBoard, getDictionary } from "../../../utils/server";

export default async function JobRowMobile({
  job,
  k,
  locale,
}: {
  job: Job;
  k: (s: string | number | undefined) => number | undefined;
  locale: Locale;
}) {
  const { employer, address, title, workload, salary } = job;
  const dict = await getDictionary(locale);
  const customBoard = await getCustomBoard();

  return (
    <div className="flex sm:hidden p-3 gap-5">
      {!customBoard?.cards && employer?.logo ? (
        <Image
          src={employer.logo}
          alt={`${dict["Logo of"]} ${employer?.name}`}
          className="block sm:hidden w-[70px] sm:h-[52px] object-contain md:w-[130px]"
          width={130}
          height={52}
        />
      ) : (
        ""
      )}
      <div className="flex flex-col w-full gap-1">
        <h2 className="sm:text-xl break-words font-title font-medium text-digitalent-green">
          {title}
        </h2>
        <div className="flex gap-3 items-baseline">
          {salary?.amount && (
            <span className="font-title font-light text-sm ">
              {salary.amount?.[0] === salary?.amount?.[1]
                ? k(salary.amount?.[0])
                : k(salary.amount?.[0])}
              {" -"} {k(salary.amount?.[1])}
              {"k " + salary?.currency}
            </span>
          )}
          <span className="font-title !font-lighter text-xs">
            {workload && workload[0] === workload[1]
              ? `${workload[0]}%`
              : `${workload?.[0]} - ${workload?.[1]}%`}
          </span>
        </div>
        {address && (
          <span className="font-title !font-light text-xs">
            {`${address?.city || address?.country}`}
          </span>
        )}
      </div>
    </div>
  );
}
