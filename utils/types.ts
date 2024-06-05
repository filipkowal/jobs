import { components, paths } from "../schema";
import customBoard from "../customBoard.json";

export { type Locale } from "../i18n-config";

export type CustomBoard = typeof customBoard;

export type SearchParams = ActiveFilters & { [key: string]: any };

type LastPart<T extends string> = T extends `${string}/${infer Last}`
  ? LastPart<Last>
  : T;
export type Endpoint = LastPart<keyof paths>;

// Response types
export type Jobs = paths["/{language}/jobs"]["get"]["responses"][
  | "200"
  | "404"]["content"]["application/json"];
export type ActiveFilters = paths["/{language}/jobs"]["get"]["responses"][
  | "200"
  | "404"]["content"]["application/json"]["activeFilters"];
export type Job = paths["/{language}/jobs/{id}"]["get"]["responses"][
  | "200"
  | "404"]["content"]["application/json"];
export type Filters = paths["/{language}/filters"]["get"]["responses"][
  | "200"
  | "404"]["content"]["application/json"];

export type ActiveFilterName = keyof NonNullable<ActiveFilters>;

// Query types
export type JobsQuery = paths["/{language}/jobs"]["get"]["parameters"]["query"];
export type ApplyQuery = components["schemas"]["apply_body"];
