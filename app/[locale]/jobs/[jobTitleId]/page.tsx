import { JOBS_LIMIT } from "@/utils/constants";
import { type Locale } from "@/i18n-config";
import JobTable from "../../JobTable";
import { getJobs, getJobsInternal, getShortId, Job } from "@/utils";
import FiltersSectionContainer from "../../_Filters/FiltersSectionContainer";
import Heading, { HeadingSkeleton } from "../../Heading";
import { getCustomBoard, readFilters } from "@/utils/server";
import { Suspense } from "react";
import FiltersSkeleton from "../../_Filters/FiltersSkeleton";
import JobTableSkeleton from "../../JobTableSkeleton";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale; jobTitleId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const customBoard = await getCustomBoard();

  const jobsResponse = await getJobs({
    locale: params.locale,
    boardId: customBoard?.id,
    init: { cache: "force-cache" },
  });

  const job = jobsResponse?.jobs?.find((job: Job) =>
    job?.id?.includes(getShortId(params.jobTitleId))
  );

  return job?.metainfo || {};
}

export default async function Home(props: {
  params: Promise<{ locale: Locale; jobTitleId: string }>;
}) {
  const params = await props.params;
  const customBoard = await getCustomBoard();

  const filtersPromise = readFilters(params.locale);

  const jobsPromise = getJobsInternal({
    locale: params.locale,
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
          })}
        </Suspense>
      </div>
    </main>
  );
}
