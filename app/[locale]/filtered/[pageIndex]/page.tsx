import { JOBS_LIMIT } from "../../../../utils/constants";
import { type Locale } from "../../../../i18n-config";
import JobTable from "../../JobTable";
import { getFilters, getJobs } from "../../../../utils/server";
import FiltersSectionContainer from "../../_Filters/FiltersSectionContainer";
import Title, { TitleSkeleton } from "../../Title";
import { getCustomBoard } from "../../../../utils/server";
import { Suspense } from "react";
import Spinner from "../../../../components/Spinner";
import FiltersSkeleton from "../../_Filters/FiltersSkeleton";
import { ActiveFilters } from "../../../../utils";
import JobTableSkeleton from "../../JobTableSkeleton";

export default async function Home({
  params,
  searchParams,
}: {
  params: { locale: Locale; pageIndex: string };
  searchParams: ActiveFilters & { [key: string]: any };
}) {
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
    },
    init: { next: { revalidate: 0 } },
  });
  const customBoard = await getCustomBoard();

  return (
    <main className="min-h-[calc(100vh-33.5px)] flex flex-col items-center">
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
    </main>
  );
}
