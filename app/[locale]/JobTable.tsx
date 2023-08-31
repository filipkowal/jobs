import { Locale } from "../../i18n-config";
import { getCustomBoard } from "../../utils/server";
import { Jobs, SearchParams } from "../../utils";
import JobRowAccordion from "./_JobRow/JobRowAccordion";
import JobRowDetails from "./_JobRow/JobRowDetails";
import JobTablePagination from "./_JobRow/JobTablePagination";
import JobRowHeading from "./_JobRow/JobRowHeading";
import JobActions from "./_JobRow/JobRowActions";

export default async function JobTable({
  searchParams,
  params,
  jobsPromise,
  limit,
}: {
  searchParams?: SearchParams;
  params: { locale: Locale; jobId?: string[] };
  limit: number;
  jobsPromise?: Promise<Jobs>;
}) {
  const customBoard = await getCustomBoard();

  const jobsResponse = await jobsPromise;
  const jobs = jobsResponse?.jobs;
  const length = jobsResponse?.length;

  function k(s: string | number | undefined) {
    if (s === undefined) return;
    const n = Number(s) / 1000;
    return n;
  }

  return (
    <div
      className={`mb-48 items-center ${
        customBoard.cards
          ? `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8`
          : `flex flex-col`
      }`}
    >
      {jobs?.map((job) => (
        <JobRowAccordion
          job={job}
          key={job.id}
          customBoard={customBoard}
          headingDesktop={
            <JobRowHeading job={job} k={k} locale={params.locale} />
          }
        >
          {!customBoard?.disableDetailView && (
            <div className="flex flex-row flex-wrap-reverse lg:flex-nowrap justify-center sm:pb-6 bg-digitalent-gray-light sm:bg-inherit">
              {customBoard.disableDetailView ? null : (
                <JobRowDetails locale={params.locale} job={job} />
              )}

              <JobActions
                landingPageUrl={job.landingPageUrl}
                locale={params.locale}
                jobId={job.id}
                customBoard={customBoard}
              />
            </div>
          )}
        </JobRowAccordion>
      ))}

      <JobTablePagination
        limit={limit}
        locale={params.locale}
        length={length}
        searchParams={searchParams}
        params={params}
      />
    </div>
  );
}
