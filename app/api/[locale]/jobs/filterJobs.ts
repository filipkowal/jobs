import { ActiveFilters, Jobs } from "@/utils";

export default function filterJobs(
  jobs: Jobs["jobs"],
  filters: ActiveFilters
): Jobs["jobs"] {
  if (!jobs) return [];
  if (!filters) return jobs;

  return jobs.filter((job) => {
    return Object.entries(filters).every(([filterName, filterValue]) => {
      if (
        !filterValue ||
        (Array.isArray(filterValue) && filterValue.length === 0)
      )
        return true;

      // array filters, array job values
      if (filterName === "technologies" && job?.technologies) {
        return job?.technologies?.some((v) =>
          (filterValue as string[]).includes(v)
        );
      }
      if (filterName === "careerFields" && job?.careerFields) {
        return job?.careerFields?.some((v) =>
          (filterValue as string[]).includes(v)
        );
      }
      if (filterName === "industries" && job?.industries) {
        return job?.industries?.some((v) =>
          (filterValue as string[]).includes(v)
        );
      }

      // array filters, string job values
      if (filterName === "jobLevels" && job?.jobLevel) {
        return filters?.jobLevels?.includes(job?.jobLevel);
      }

      // @fixme: change to companySize when api is ready
      if (filterName === "companySizes" && job?.companySize) {
        return filters?.companySizes?.includes((job as any)?.companySize);
      }

      if (filterName === "cantons" && job?.address?.canton) {
        return filters?.cantons?.includes(job?.address?.canton);
      }

      // range filters, range job values
      if (filterName === "workload" && job?.workload && filters?.workload) {
        const [filterMin, filterMax] = filters.workload.map(Number);
        const [min, max] = job?.workload;

        const minInRange = min <= filterMax;
        const maxInRange = max >= filterMin;

        return minInRange && maxInRange;
      }

      // number filters, range job values
      if (
        filterName === "homeOffice" &&
        job?.homeOffice &&
        filters?.homeOffice
      ) {
        return job?.homeOffice[1] >= filters?.homeOffice;
      }

      if (filterName === "salary" && job?.salary?.amount && filters?.salary) {
        return job.salary.amount[1] >= filters.salary;
      }

      return true;
    });
  });
}
