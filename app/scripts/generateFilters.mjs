const isStringArr = (value) => {
  return (
    Array.isArray(value) && value.length > 0 && typeof value[0] === "string"
  );
};

const isNumberTuple = (value) => {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
};

const isSalary = (value) =>
  !!value?.hasOwnProperty("amount");

const isAddress = (value) => 
  !!value?.hasOwnProperty("canton") || !!value?.hasOwnProperty("state");

const isArrOfStringsKey = (key) =>
  ["careerFields", "technologies", "industries"].includes(key);

const addStringFilter = (filters, v) => {
  const currentFilter = filters || [];
  return currentFilter.includes(v) ? currentFilter : [...currentFilter, v];
};

const getMaxRange = (a, b) => {
  if (!b) return a;
  const [minA, maxA] = a;
  const [minB, maxB] = b;
  return [Math.min(minA, minB), Math.max(maxA, maxB)];
};

export default function generateFilters(jobs) {
  const filters = {};

  jobs?.forEach((job) => {
    Object.keys(job).forEach((key) => {
      const value = job[key];

      if (key === "tags") return;

      // @fixme: change to cantons when api is ready
      if (key === "address" && isAddress(value) && (job?.address?.canton || job?.address?.state)) {
        const canton = job?.address?.canton || job?.address?.state;
        filters.cantons = addStringFilter(
          filters.cantons,
          canton
        );
        return;
      }

      // @fixme: change to companySize when api is ready
      if ((key === "companySizes" || key === "companySize") && typeof value === "string") {
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