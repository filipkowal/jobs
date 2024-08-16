import { GetServerSidePropsContext } from "next";
import { getJobs, Locale } from "@/utils";
import CompareJobTable from "./CompareJobTable";
import { getCustomBoard, getDictionary } from "@/utils/server";

export default async function ComparePage({
  params,
}: {
  params: GetServerSidePropsContext;
}) {
  const dict = await getDictionary(params.locale as Locale);
  const customBoard = await getCustomBoard();

  const { jobs } = await getJobs({
    locale: params.locale as Locale,
    searchParams: {
      customBoardId: customBoard?.id,
    },
    init: { next: { revalidate: 0 } },
  });

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
