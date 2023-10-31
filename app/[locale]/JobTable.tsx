import { Locale } from "../../i18n-config";
import { getCustomBoard, getDictionary } from "../../utils/server";
import { Job, Jobs, SearchParams } from "../../utils";
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
  params: { locale: Locale; jobId?: string };
  limit: number;
  jobsPromise?: Promise<Jobs>;
}) {
  const customBoard = await getCustomBoard();
  const dict = await getDictionary(params.locale);

  const jobsResponse = await jobsPromise;

  function sortJobsInitOpenFirst(jobs?: Job[]) {
    if (params?.jobId) {
      return jobs?.sort((a, b) => {
        if (a.id === params?.jobId) {
          return -1;
        } else if (b.id === params?.jobId) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return jobs;
  }

  const jobs = sortJobsInitOpenFirst(jobsResponse?.jobs);

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
        <>
          <JobRowAccordion
            job={job}
            initOpenJobId={params?.jobId}
            locale={params.locale}
            key={job.id}
            customBoard={customBoard}
            jobRowHeading={
              <JobRowHeading job={job} k={k} locale={params.locale} />
            }
          >
            {!customBoard?.disableDetailView && (
              <div className="flex flex-row flex-wrap-reverse lg:flex-nowrap justify-center sm:pb-6 bg-digitalent-gray-light sm:bg-inherit">
                <JobRowDetails locale={params.locale} job={job} />

                <JobActions
                  landingPageUrl={job.landingPageUrl}
                  locale={params.locale}
                  jobId={job.id}
                  customBoard={customBoard}
                />
              </div>
            )}
          </JobRowAccordion>

          {
            // Separator after initially open job
            params.jobId === job.id && (
              <div className="my-6 w-full text-center text-digitalent-blue text-xl font-title">
                - {dict["More jobs"]} -
              </div>
            )
          }
        </>
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
