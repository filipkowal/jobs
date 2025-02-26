import { Locale } from "@/i18n-config";
import { Jobs, JOBS_LIMIT, pickActiveFiltersFromSearchParams } from "@/utils";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const { locale } = await params;
  try {
    const filePath = path.join(process.cwd(), "app/data", locale, "jobs.json");
    const fileContent = await fs.readFile(filePath, "utf-8");

    const jobs: Jobs = JSON.parse(fileContent);

    const query = new URL(request.url).searchParams;
    const filters = pickActiveFiltersFromSearchParams(query);
    const page = query.get("page")
      ? parseInt(query.get("page") as string, 10)
      : 0;

    console.log("filters: ", filters);
    console.log("page: ", page);

    const jobsResponse = {
      ...jobs,
      jobs: paginate(jobs.jobs, page, JOBS_LIMIT),
    };

    return Response.json(jobsResponse);
  } catch (e: any) {
    return Response.json(e, { status: 500 });
  }
}

function paginate(arr: any[] | undefined, page: number, limit: number) {
  if (!arr) return [];
  return arr.slice(page * limit, limit * (page + 1));
}
