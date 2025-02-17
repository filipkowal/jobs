import { i18n } from "@/i18n-config";
import { SERVER_URL } from "@/utils/constants";
import { components, paths } from "@/schema";

import fs from "fs";
import path from "path";

type Job = components["schemas"]["Job"];
type Jobs =
  paths["/{language}/jobs"]["get"]["responses"]["200"]["content"]["application/json"];

function isSalaryType(
  filterName: Job[keyof Job]
): filterName is NonNullable<Job["salary"]> {
  return !!filterName?.hasOwnProperty("amount") && filterName === "salary";
}

const isStringArr = (value: Job[keyof Job]): value is string[] =>
  Array.isArray(value) && value.length > 0 && typeof value[0] === "string";

const isNumberTuple = (value: Job[keyof Job]): value is [number, number] =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === "number" &&
  typeof value[1] === "number";

const customBoard = import("@/customBoard.json").then(
  (module) => module.default
);
export const getCustomBoard = async () => customBoard;

function generateFilters(jobs: Jobs["jobs"]) {
  const filters: Record<string, any> = {};

  jobs?.forEach((job) => {
    Object.keys(job).forEach((key) => {
      const value = job[key as keyof Job];

      if (["jobLevel", "companySizes"].includes(key)) {
        filters[key] = filters[key] ? [...filters[key], value] : [value];
      } else if (isStringArr(value)) {
        filters[key] = filters[key] ? [...filters[key], ...value] : [...value];
      } else if (isNumberTuple(value)) {
        let v = value;
        if (isSalaryType(value) && isNumberTuple(value.amount)) {
          v = value.amount;
        }
        const [min, max] = filters[key] || [Infinity, 0];
        filters[key] = [Math.min(min, value[0]), Math.max(max, value[1])];
      }
    });
  });

  return filters;
}

async function saveData() {
  const boardId = await getCustomBoard().then((board) => board.id);

  for (const locale of i18n.locales) {
    console.log(`Fetching jobs for ${locale}...`);

    const jobs = await fetch(`${SERVER_URL}/${locale}/jobs`, {
      headers: { "Custom-Board-Id": boardId || "" },
    }).then((res) => res.json());

    const filters = generateFilters(jobs?.jobs);

    const localeDir = path.join(__dirname, "..", "data", locale);
    if (!fs.existsSync(localeDir)) fs.mkdirSync(localeDir, { recursive: true });

    fs.writeFileSync(
      path.join(localeDir, "jobs.json"),
      JSON.stringify(jobs, null, 2)
    );
    fs.writeFileSync(
      path.join(localeDir, "filters.json"),
      JSON.stringify(filters, null, 2)
    );

    console.log(`Saved jobs and filters for ${locale}`);
  }
}

saveData().catch((err) => console.error("Error:", err));
