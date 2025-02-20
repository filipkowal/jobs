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
): value is NonNullable<Job["address"]> => !!value?.hasOwnProperty("canton");

const isArrOfStringsKey = (key: string): key is ArrOfStringsFilter =>
  ["careerFields", "technologies", "industries"].includes(key);

const addStringFilter = (
  filters: Pick<Filters, "cantons" | "jobLevels" | "companySizes">,
  k: "cantons" | "jobLevels" | "companySizes",
  v: string
): string[] =>
  filters[k]
    ? filters[k]?.includes(v)
      ? filters[k]
      : [...filters[k], v]
    : [v];

const getMaxRange = (v: number[]): number[] => {
  const [min, max] = v || [Infinity, 0];
  return [Math.min(min, v[0]), Math.max(max, v[1])];
};

export default function generateFilters(jobs: Jobs["jobs"]): Filters {
  const filters: Filters = {};

  jobs?.forEach((job) => {
    Object.keys(job).forEach((keyUntyped) => {
      const key = keyUntyped as keyof Job;
      const value = job[key];

      if (key === "tags") return;

      if (key === "address" && isAddress(value) && value.canton) {
        filters.cantons = addStringFilter(filters, "cantons", value?.canton);
        return;
      }

      if (key === "companySize" && typeof value === "string") {
        filters.companySizes = addStringFilter(filters, "companySizes", value);
        return;
      }

      if (key === "jobLevel" && typeof value === "string") {
        filters.jobLevels = addStringFilter(filters, "jobLevels", value);
        return;
      }

      if (
        isNumberTuple(value) &&
        (key === "workload" || key === "homeOffice")
      ) {
        // Number range filters
        filters[key] = getMaxRange(value);
        return;
      }

      if (key === "salary" && isSalary(value) && value.amount) {
        filters.salary = getMaxRange(value.amount);
        return;
      }

      if (isStringArr(value) && isArrOfStringsKey(key)) {
        // Array of strings filters
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
