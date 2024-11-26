import { JOBS_LIMIT } from "@/utils/constants";
import { type Locale, i18n } from "@/i18n-config";
import JobTable from "./JobTable";
import { getFilters, getJobs } from "@/utils";
import { getCustomBoard } from "@/utils/server";
import FiltersSectionContainer from "./_Filters/FiltersSectionContainer";
import Heading from "./Heading";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import FiltersSkeleton from "./_Filters/FiltersSkeleton";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: { locale: Locale } }) {
  const customBoard = await getCustomBoard();

  const filtersPromise = getFilters({
    locale: params.locale,
    customBoardId: customBoard?.id,
  });
  const jobsPromise = getJobs({
    locale: params.locale,
    searchParams: {
      limit: JOBS_LIMIT,
    },
    customBoardId: customBoard?.id,
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
