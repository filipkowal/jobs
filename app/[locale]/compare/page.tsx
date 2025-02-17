import { GetServerSidePropsContext } from "next";
import { getJobs, Locale } from "@/utils";
import CompareJobTable from "./CompareJobTable";
import { getCustomBoard, getDictionary } from "@/utils/server";

export default async function ComparePage(props: {
  params: Promise<GetServerSidePropsContext>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.locale as Locale);
  const customBoard = await getCustomBoard();

  const { jobs } = await getJobs({
    locale: params.locale as Locale,
    boardId: customBoard?.id,
    init: { cache: "force-cache" },
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
