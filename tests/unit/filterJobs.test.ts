import { describe, it, expect } from "vitest";
import filterJobs from "../../app/api/[locale]/jobs/filterJobs";
import { Jobs, ActiveFilters } from "@/utils";

describe("filterJobs", () => {
  const jobs: Jobs["jobs"] = [
    {
      id: "1",
      jobLevel: "senior",
      companySize: "large",
      address: { canton: "Zurich" },
      technologies: ["react", "nodejs"],
      workload: [80, 100],
      salary: { amount: [80000, 100000] },
      homeOffice: [40, 60],
    },
    {
      id: "2",
      jobLevel: "junior",
      companySize: "small",
      address: { canton: "Bern" },
      technologies: ["angular", "java"],
      workload: [60, 80],
      salary: { amount: [50000, 70000] },
      homeOffice: [10, 30],
    },
    {
      id: "3",
      jobLevel: "mid",
      companySize: "medium",
      address: { canton: "Zurich" },
      technologies: ["vue", "python"],
      workload: [40, 60],
      salary: { amount: [60000, 80000] },
      homeOffice: [20, 40],
    },
  ];

  it("should filter jobs by technologies", () => {
    const filters: ActiveFilters = { technologies: ["react"] };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(1);
    expect(result?.[0].id).toBe("1");
  });

  it("should filter jobs by jobLevel", () => {
    const filters: ActiveFilters = { jobLevels: ["senior"] };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(1);
    expect(result?.[0].id).toBe("1");
  });

  it("should filter jobs by companySize", () => {
    const filters: ActiveFilters = { companySizes: ["small"] };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(1);
    expect(result?.[0].id).toBe("2");
  });

  it("should filter jobs by canton", () => {
    const filters: ActiveFilters = { cantons: ["Zurich"] };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(2);
    expect(result?.[0].id).toBe("1");
    expect(result?.[1].id).toBe("3");
  });

  it("should filter jobs by workload", () => {
    const filters: ActiveFilters = { workload: [70, 90] };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(2);
    expect(result?.[0].id).toBe("1");
    expect(result?.[1].id).toBe("2");
  });

  it("should filter jobs by salary", () => {
    const filters: ActiveFilters = { salary: 75000 };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(2);
    expect(result?.[0].id).toBe("1");
    expect(result?.[1].id).toBe("3");
  });

  it("should filter jobs by homeOffice", () => {
    const filters: ActiveFilters = { homeOffice: 35 };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(2);
    expect(result?.[0].id).toBe("1");
    expect(result?.[1].id).toBe("3");
  });

  it("should return all jobs if no filters are applied", () => {
    const filters: ActiveFilters = {};
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(3);
  });

  it("should return no jobs if filters do not match any job", () => {
    const filters: ActiveFilters = { technologies: ["nonexistent"] };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(0);
  });

  it("should handle empty jobs array", () => {
    const filters: ActiveFilters = { technologies: ["react"] };
    const result = filterJobs([], filters);
    expect(result).toHaveLength(0);
  });

  it("should handle filters with undefined values", () => {
    const filters: ActiveFilters = { technologies: undefined };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(3);
  });

  it("should handle filters with empty arrays", () => {
    const filters: ActiveFilters = { technologies: [] };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(3);
  });

  it("should only allow jobs that passed all the filters", () => {
    const filters: ActiveFilters = {
      technologies: ["react"],
      jobLevels: ["senior"],
      companySizes: ["large"],
      cantons: ["Zurich"],
      workload: [70, 90],
      salary: 80000,
      homeOffice: 40,
    };
    const result = filterJobs(jobs, filters);
    expect(result).toHaveLength(1);
    expect(result?.[0].id).toBe("1");
  });
});
