import { Locale } from "@/i18n-config";
import { getCustomBoard, getDictionary } from "@/utils/server";
import { Jobs, SearchParams, getShortId, sortJobsInitOpenFirst } from "@/utils";
import JobRowAccordion from "./_JobRow/JobRowAccordion";
import JobRowDetails from "./_JobRow/JobRowDetails";
import JobTablePagination from "./_JobRow/JobTablePagination";
import JobRowHeading from "./_JobRow/JobRowHeading";
import JobActions from "./_JobRow/JobRowActions";
import { Fragment } from "react";

export default async function JobTable({
  searchParams,
  params,
  jobsPromise,
  limit,
}: {
  searchParams?: SearchParams;
  params: { locale: Locale; jobTitleId?: string };
  limit: number;
  jobsPromise?: Promise<Response | Jobs>;
}) {
  const customBoard = await getCustomBoard();
  const { locale, jobTitleId } = params;
  const dict = await getDictionary(locale);

  let jobsBody = await jobsPromise;

  if (jobsBody instanceof Response) {
    try {
      jobsBody = await jobsBody?.json();
    } catch (error) {
      console.error(error);
    }
  }

  const jobs = isJobsBody(jobsBody) ? jobsBody.jobs : undefined;
  const sortedJobs = sortJobsInitOpenFirst(jobs, jobTitleId);

  const length = isJobsBody(jobsBody) ? jobsBody.length : undefined;
  const filteredLength = hasFilteredLength(jobsBody) ? jobsBody.filteredLength : undefined;

  return (
    <div
      className={`mb-48 items-center ${
        customBoard.cards
          ? `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8`
          : `flex flex-col`
      }`}
    >
      {sortedJobs?.map((job) => (
        <Fragment key={job.id}>
          <JobRowAccordion
            job={job}
            initOpenJobTitleId={params?.jobTitleId}
            locale={locale}
            key={job.id}
            customBoard={customBoard}
            jobRowHeading={<JobRowHeading job={job} locale={locale} />}
          >
            {!customBoard?.disableDetailView && (
              <div className="flex flex-row flex-wrap-reverse lg:flex-nowrap justify-center sm:pb-6 bg-digitalent-gray-light sm:bg-inherit">
                <JobRowDetails locale={locale} job={job} />

                <JobActions
                  landingPageUrl={job.landingPageUrl}
                  locale={locale}
                  jobId={job.id}
                  customBoard={customBoard}
                />
              </div>
            )}
          </JobRowAccordion>

          {
            // Separator after initially open job
            getShortId(params.jobTitleId) === getShortId(job.id) && (
              <div className="my-6 w-full text-center text-digitalent-blue text-xl font-title">
                - {dict["More jobs"]} -
              </div>
            )
          }
        </Fragment>
      ))}

      <JobTablePagination
        limit={limit}
        locale={locale}
        length={filteredLength || length}
        searchParams={searchParams}
        params={params}
      />
    </div>
  );
}

function isJobsBody(v?: Response | Jobs): v is Jobs {
  if (!v) return false;
  return v?.hasOwnProperty("jobs") && v?.hasOwnProperty("length");
}

function hasFilteredLength(v?: Response | Jobs): v is Jobs & { filteredLength: number } {
  if (!v) return false;
  return v?.hasOwnProperty("jobs") && v?.hasOwnProperty("filteredLength");
}
