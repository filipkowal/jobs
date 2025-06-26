import { Filters, Job, Jobs } from "@/utils";

type ArrOfStringsFilter = "careerFields" | "technologies" | "industries";

const isStringArr = (value: Job[keyof Job]): value is string[] => {
  return (
    Array.isArray(value) && value.length > 0 && typeof value[0] === "string"
  );
};

const isNumberTuple = (value: Job[keyof Job]): value is number[] => {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
};

const isSalary = (value: Job[keyof Job]): value is NonNullable<Job["salary"]> =>
  !!value?.hasOwnProperty("amount");

const isAddress = (
  value: Job[keyof Job]
): value is NonNullable<Job["address"]> & { canton: string } =>
  !!value?.hasOwnProperty("canton");

const isArrOfStringsKey = (key: string): key is ArrOfStringsFilter =>
  ["careerFields", "technologies", "industries"].includes(key);

const addStringFilter = (
  filters: string[] | undefined,
  v: string
): string[] => {
  const currentFilter = filters || [];
  return currentFilter.includes(v) ? currentFilter : [...currentFilter, v];
};

const getMaxRange = (a: number[], b: number[] | undefined): number[] => {
  if (!b) return a;
  const [minA, maxA] = a;
  const [minB, maxB] = b;
  return [Math.min(minA, minB), Math.max(maxA, maxB)];
};

export default function generateFilters(jobs: Jobs["jobs"]): Filters {
  const filters: Filters = {};

  jobs?.forEach((job) => {
    Object.keys(job).forEach((keyUntyped) => {
      const key = keyUntyped as keyof Job;
      const value = job[key];

      if (key === "tags") return;

      if (key === "address" && isAddress(value)) {
        filters.cantons = addStringFilter(filters.cantons, value.canton);
        return;
      }

      if (key === "companySize" && typeof value === "string") {
        filters.companySizes = addStringFilter(filters.companySizes, value);
        return;
      }

      if (key === "jobLevel" && typeof value === "string") {
        filters.jobLevels = addStringFilter(filters.jobLevels, value);
        return;
      }

      // Number range filters
      if (
        isNumberTuple(value) &&
        (key === "workload" || key === "homeOffice")
      ) {
        filters[key] = getMaxRange(value, filters[key]);
        return;
      }

      if (key === "salary" && isSalary(value) && isNumberTuple(value.amount)) {
        filters.salary = getMaxRange(value.amount, filters.salary);
        return;
      }

      // Array of strings filters eg. careerFields, industries, technologies
      if (isStringArr(value) && isArrOfStringsKey(key)) {
        filters[key] = filters[key]
          ? [
              ...filters[key],
              ...value.filter((v) => !filters[key]?.includes(v)),
            ]
          : [...value];
        return;
      }
    });
  });

  return filters;
}
