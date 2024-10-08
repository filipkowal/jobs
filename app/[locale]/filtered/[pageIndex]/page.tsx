import { JOBS_LIMIT } from "@/utils/constants";
import { type Locale } from "@/i18n-config";
import JobTable from "../../JobTable";
import { getFilters, getJobs } from "@/utils";
import FiltersSectionContainer from "../../_Filters/FiltersSectionContainer";
import Heading, { HeadingSkeleton } from "../../Heading";
import { getCustomBoard } from "@/utils/server";
import { Suspense } from "react";
import FiltersSkeleton from "../../_Filters/FiltersSkeleton";
import { ActiveFilters } from "@/utils";
import JobTableSkeleton from "../../JobTableSkeleton";

export default async function Home({
  params,
  searchParams,
}: {
  params: { locale: Locale; pageIndex: string };
  searchParams: ActiveFilters & { [key: string]: any };
}) {
  const customBoard = await getCustomBoard();

  const filtersPromise = getFilters({
    locale: params.locale,
    init: { next: { revalidate: 0 } },
  });
  const jobsPromise = getJobs({
    locale: params.locale,
    searchParams: {
      ...searchParams,
      offset: parseInt(params.pageIndex) * JOBS_LIMIT,
      limit: JOBS_LIMIT,
      customBoardId: customBoard?.id,
    },
    init: { next: { revalidate: 0 } },
  });

  return (
    <main className="w-full flex justify-center">
      <div className="min-h-[calc(100vh-33.5px)] lg:w-10/12 w-full max-w-[70rem] items-left flex flex-col">
        <Suspense fallback={<HeadingSkeleton />}>
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

        <Suspense fallback={<JobTableSkeleton />}>
          {await JobTable({
            params,
            jobsPromise,
            limit: JOBS_LIMIT,
            searchParams: searchParams,
          })}
        </Suspense>
      </div>
    </main>
  );
}
