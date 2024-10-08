import { components, paths } from "@/schema";
import customBoard from "@/customBoard.json";
export type { Dictionary } from "./server";

export { type Locale } from "@/i18n-config";

export type CustomBoard = typeof customBoard;

export type SearchParams = ActiveFilters & { [key: string]: any };

type LastPart<T extends string> = T extends `${string}/${infer Last}`
  ? LastPart<Last>
  : T;
export type Endpoint = LastPart<keyof paths>;

// Response types
export type Jobs =
  paths["/{language}/jobs"]["get"]["responses"]["200"]["content"]["application/json"];
export type ActiveFilters =
  paths["/{language}/jobs"]["get"]["responses"]["200"]["content"]["application/json"]["activeFilters"];
export type Job = components["schemas"]["Job"];
export type Filters =
  paths["/{language}/filters"]["get"]["responses"]["200"]["content"]["application/json"];

export type ActiveFilterName = keyof NonNullable<ActiveFilters>;

export type FiltersUrlParams = Omit<JobsQuery, "customBoardId">;
// Query types

// Make sure customBoardId is required
export type JobsQuery =
  paths["/{language}/jobs"]["get"]["parameters"]["query"] & {
    customBoardId: string;
  };
export type ApplyQuery = components["schemas"]["apply_body"];

// Filters types
export type OpenFilterName = ActiveFilterName | "none";
