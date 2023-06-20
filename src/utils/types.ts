import { components, paths } from "@/schema";

export type SearchParams =
  | Record<string, string | (string | boolean | number)[]>
  | undefined;

// Response types
export type CustomUser = paths["/{language}/customBoard"]["get"]["responses"][
  | "200"
  | "400"
  | "404"]["content"]["application/json"];
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
