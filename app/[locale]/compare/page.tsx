import { GetServerSidePropsContext } from "next";
import { getJobs, Locale } from "../../../utils";
import CompareJobTable from "./CompareJobTable";
import { getDictionary } from "../../../utils/server";

export default async function ComparePage({
  params,
}: {
  params: GetServerSidePropsContext;
}) {
  const { jobs } = await getJobs({
    locale: params.locale as Locale,
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
