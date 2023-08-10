import { GetServerSidePropsContext } from "next";
import { getJobs, JOBS_REVALIDATE_TIME, Locale } from "../../../utils";
import CompareJobTable from "./CompareJobTable";
import { getCustomBoard, getDictionary } from "../../../utils/server";

export default async function ComparePage({
  params,
}: {
  params: GetServerSidePropsContext;
}) {
  const customBoard = await getCustomBoard();

  const { jobs } = await getJobs({
    searchParams: {
      employerName: customBoard.employerNameFilter,
    },
    locale: params.locale as Locale,
    init: { next: { revalidate: JOBS_REVALIDATE_TIME } },
  });

  const dict = await getDictionary(params.locale as Locale);

  if (!jobs) return null;

  return (
    <CompareJobTable
      jobs={jobs}
      locale={(params.locale as Locale) || "en"}
      dict={dict.compareJobTable}
    />
  );
}
