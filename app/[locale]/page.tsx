import { JOBS_LIMIT, JOBS_REVALIDATE_TIME } from "../../utils/constants";
import { type Locale, i18n } from "../../i18n-config";
import JobTable from "./JobTable";
import { getFilters, getJobs } from "../../utils/server";
import FiltersSectionContainer from "./_Filters/FiltersSectionContainer";
import Title from "./Title";
import { getCustomBoard } from "../../utils/server";
import { Suspense } from "react";
import Spinner from "../../components/Spinner";
import FiltersSkeleton from "./_Filters/FiltersSkeleton";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: { locale: Locale } }) {
  const filtersPromise = getFilters({
    locale: params.locale,
    init: { next: { revalidate: JOBS_REVALIDATE_TIME } },
  });
  const jobsPromise = getJobs({
    locale: params.locale,
    searchParams: {
      limit: JOBS_LIMIT,
    },
    init: { next: { revalidate: JOBS_REVALIDATE_TIME } },
  });
  const customBoard = await getCustomBoard();

  return (
    <main className="min-h-[calc(100vh-33.5px)] flex flex-col items-center">
      <Suspense fallback={<Spinner />}>
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

      <Suspense fallback={<Spinner />}>
        {await JobTable({
          params,
          jobsPromise,
          limit: JOBS_LIMIT,
          offset: 0,
        })}
      </Suspense>
    </main>
  );
}
