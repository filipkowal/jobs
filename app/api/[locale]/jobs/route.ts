import { NextRequest } from "next/server";
import type { Locale } from "@/i18n-config";
import {
  Jobs,
  JOBS_LIMIT,
  paginate,
  pickActiveFiltersFromSearchParams,
} from "@/utils";
import filterJobs from "./filterJobs";
import { readJobs } from "@/utils/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const isLocale = (value: string): value is Locale =>
    value === "en" || value === "de" || value === "fr";
  try {
    if (!isLocale(locale)) {
      return Response.json({ error: "Invalid locale" }, { status: 400 });
    }
    const query = new URL(request.url).searchParams;
    const filters = pickActiveFiltersFromSearchParams(query);
    const page = query.get("page")
      ? parseInt(query.get("page") as string, 10)
      : 0;

    const jobs: Jobs = await readJobs(locale);

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
