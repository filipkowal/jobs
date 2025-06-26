import { Locale } from "@/utils";
import CompareJobTable from "./CompareJobTable";
import { getCustomBoard, getDictionary, readJobs } from "@/utils/server";

export default async function ComparePage(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.locale);
  const customBoard = await getCustomBoard();

  const { jobs } = await readJobs(params.locale);

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
