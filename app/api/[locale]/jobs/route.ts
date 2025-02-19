import { Locale } from "@/i18n-config";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const { locale } = await params;

  const filePath = path.join(process.cwd(), "app/data", locale, "jobs.json");
  const fileContent = await fs.readFile(filePath, "utf-8");

  return new Response(fileContent, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
