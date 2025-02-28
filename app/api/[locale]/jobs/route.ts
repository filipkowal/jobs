import { Locale } from "@/i18n-config";
import {
  Jobs,
  JOBS_LIMIT,
  paginate,
  pickActiveFiltersFromSearchParams,
} from "@/utils";
import filterJobs from "./filterJobs";
import { readJobs } from "@/utils/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const { locale } = await params;
  try {
    const query = new URL(request.url).searchParams;
    const filters = pickActiveFiltersFromSearchParams(query);
    const page = query.get("page")
      ? parseInt(query.get("page") as string, 10)
      : 0;

    const jobs: Jobs = await readJobs(locale, 0, true);

    const filteredJobs = filterJobs(jobs.jobs, filters);

    const jobsResponse = {
      ...jobs,
      jobs: paginate(filteredJobs, page, JOBS_LIMIT),
      filteredLength: filteredJobs?.length,
    };

    return Response.json(jobsResponse);
  } catch (e: any) {
    return Response.json(e, { status: 500 });
  }
}
