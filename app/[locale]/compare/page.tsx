import { GetServerSidePropsContext } from "next";
import { getJobs, JOBS_REVALIDATE_TIME, Locale } from "../../../utils";
import CompareJobTable from "./CompareJobTable";
import { getCustomBoard, getDictionary } from "../../../utils/server";

export default async function ComparePage({
  params,
}: {
  params: GetServerSidePropsContext;
}) {
  const { jobs } = await getJobs({
    locale: params.locale as Locale,
    init: { next: { revalidate: JOBS_REVALIDATE_TIME } },
  });

  const dict = await getDictionary(params.locale as Locale);
  const customBoard = await getCustomBoard();

  if (!jobs) return null;

  return (
    <CompareJobTable
      jobs={jobs}
      locale={(params.locale as Locale) || "en"}
      dict={dict.compareJobTable}
      customBoard={customBoard}
    />
  );
}
