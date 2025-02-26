import { Locale } from "@/i18n-config";
import { Jobs, JOBS_LIMIT } from "@/utils";
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

    const jobsResponse = { ...jobs, jobs: jobs?.jobs?.slice(0, JOBS_LIMIT) };

    return Response.json(jobsResponse);
  } catch (e: any) {
    return Response.json({ error: "Failed fetching jobs" }, { status: 500 });
  }
}
