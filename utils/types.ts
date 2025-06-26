import { components, paths } from "@/schema";
import customBoard from "@/customBoard.json";
export type { Dictionary } from "./server";

export { type Locale } from "@/i18n-config";

export type CustomBoard = typeof customBoard;

export type SearchParams = ActiveFilters & { [key: string]: any };

// Response types
export type Jobs =
  paths["/{language}/jobs"]["get"]["responses"]["200"]["content"]["application/json"];
export type ActiveFilters = components["schemas"]["ActiveFilters"];
export type Job = components["schemas"]["Job"];
export type Filters = components["schemas"]["Filters"];

export type ActiveFilterName = keyof NonNullable<ActiveFilters>;

// Query types

// Make sure boardId is required
export type ApplyQuery = components["schemas"]["apply_body"];

// Filters types
export type OpenFilterName = ActiveFilterName | "none" | "all";
