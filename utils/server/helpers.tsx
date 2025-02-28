import "server-only";
import type { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import path from "path";
import { promises as fs } from "fs";
import { JOBS_LIMIT } from "../constants";
import { paginate } from "../helpers";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
};
export const getDictionary = async (locale: Locale) =>
  dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]();

const customBoard = import("@/customBoard.json").then(
  (module) => module.default
);
export const getCustomBoard = async () => customBoard;

export type Dictionary = ReturnType<typeof getDictionary> extends Promise<
  infer T
>
  ? T
  : never;

export const readJobs = async (locale: Locale, page?: number) => {
  const filePath = path.join(process.cwd(), "app/data", locale, "jobs.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const jobs = await JSON.parse(fileContent);

  return page ? paginate(jobs.jobs, page, JOBS_LIMIT) : jobs;
};

export const readFilters = async (locale: Locale) => {
  const filePath = path.join(process.cwd(), "app/data", locale, "filters.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
};
