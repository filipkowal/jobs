import { JOBS_LIMIT } from "@/utils/constants";
import { type Locale, i18n } from "@/i18n-config";
import JobTable from "../JobTable";
import { getJobs, getJobsInternal } from "@/utils";
import { getCustomBoard, readFilters } from "@/utils/server";
import FiltersSectionContainer from "../_Filters/FiltersSectionContainer";
import Heading from "../Heading";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import FiltersSkeleton from "../_Filters/FiltersSkeleton";

export async function generateStaticParams() {
  const params: Record<string, string>[] = [];
  const customBoard = await getCustomBoard();

  for (const locale of i18n.locales) {
    const getJobsResponse = await getJobs({
      locale,
      boardId: customBoard?.id,
      init: { cache: "force-cache" },
    });
    const numOfPages = Math.ceil((getJobsResponse?.length || 1) / JOBS_LIMIT);

    for (let i = 0; i < numOfPages; i++) {
      params.push({ locale, pageIndex: i.toString() });
    }
  }

  return params;
}

export default async function Home(props: {
  params: Promise<{ locale: Locale; pageIndex: number }>;
}) {
  const params = await props.params;
  const customBoard = await getCustomBoard();

  const filtersPromise = readFilters(params.locale);
  const jobsPromise = getJobsInternal({
    locale: params.locale,
    searchParams: {
      page: params.pageIndex,
    },
  });

  return (
    <main className="w-full flex justify-center">
      <div className="min-h-[calc(100vh-33.5px)] lg:w-10/12 w-full max-w-[70rem] items-left flex flex-col">
        <Suspense fallback={<Spinner />}>
          <Heading locale={params.locale} />
        </Suspense>

        {customBoard.hideAllFilters ? null : (
          <Suspense fallback={<FiltersSkeleton />}>
            <FiltersSectionContainer
              filtersPromise={filtersPromise}
              locale={params.locale}
            />
          </Suspense>
        )}

        <Suspense fallback={<Spinner />}>
          {await JobTable({
            params,
            jobsPromise,
            limit: JOBS_LIMIT,
          })}
        </Suspense>
      </div>
    </main>
  );
}
