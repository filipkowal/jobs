import "server-only";
import type { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import path from "path";
import { promises as fs } from "fs";
import { JOBS_LIMIT } from "../constants";
import { paginate } from "../helpers";
import { Jobs } from "../types";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
};
export const getDictionary = async (locale: Locale) =>
  dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]();

// Fetch customBoard.json from the public folder at runtime
export async function getCustomBoard() {
  const filePath = path.join(process.cwd(), "public", "customBoard.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export type Dictionary = ReturnType<typeof getDictionary> extends Promise<
  infer T
>
  ? T
  : never;

export const readJobs = async (
  locale: Locale,
  pagination = false,
  page = 0
): Promise<Jobs> => {
  // Use path.resolve to get absolute path from project root
  const filePath = path.resolve(
    process.cwd(),
    "app",
    "data",
    locale,
    "jobs.json"
  );

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const jobs = await JSON.parse(fileContent);

    return pagination
      ? { ...jobs, jobs: paginate(jobs.jobs, page, JOBS_LIMIT) }
      : jobs;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(`File not found: ${filePath}`);
      console.error("Current working directory:", process.cwd());
      console.error("Directory contents:", await fs.readdir(process.cwd()));
    }
    throw error;
  }
};

export const readFilters = async (locale: Locale) => {
  const filePath = path.resolve(
    process.cwd(),
    "app",
    "data",
    locale,
    "filters.json"
  );

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(`File not found: ${filePath}`);
      console.error("Current working directory:", process.cwd());
      console.error("Directory contents:", await fs.readdir(process.cwd()));
    }
    throw error;
  }
};
