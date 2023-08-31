import { JOBS_LIMIT } from "../../../utils/constants";
import { type Locale } from "../../../i18n-config";
import JobTable from "../JobTable";
import { getFilters, getJobs } from "../../../utils";
import FiltersSectionContainer from "../_Filters/FiltersSectionContainer";
import Title, { TitleSkeleton } from "../Title";
import { getCustomBoard } from "../../../utils/server";
import { Suspense } from "react";
import FiltersSkeleton from "../_Filters/FiltersSkeleton";
import { ActiveFilters } from "../../../utils";
import JobTableSkeleton from "../JobTableSkeleton";

export default async function Home({
  params,
  searchParams,
}: {
  params: { locale: Locale };
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
      employerName: customBoard.employerNameFilter,
      limit: JOBS_LIMIT,
      ...searchParams,
    },
    init: { next: { revalidate: 0 } },
  });

  return (
    <main className="w-full flex justify-center">
      <div className="min-h-[calc(100vh-33.5px)] lg:w-10/12 w-full max-w-[70rem] items-left flex flex-col">
        <Suspense fallback={<TitleSkeleton />}>
          <Title locale={params.locale} />
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
