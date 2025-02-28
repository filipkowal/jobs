import generateFilters from "./generateFilters";
import { Jobs } from "@/utils";
import { describe, it, expect } from "vitest";

describe("generateFilters", () => {
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

  it("should generate filters for technologies", () => {
    const filters = generateFilters(jobs);
    expect(filters.technologies).toEqual([
      "react",
      "nodejs",
      "angular",
      "java",
      "vue",
      "python",
    ]);
  });

  it("should generate filters for job levels", () => {
    const filters = generateFilters(jobs);
    expect(filters.jobLevels).toEqual(["senior", "junior", "mid"]);
  });

  it("should generate filters for company sizes", () => {
    const filters = generateFilters(jobs);
    expect(filters.companySizes).toEqual(["large", "small", "medium"]);
  });

  it("should generate filters for cantons", () => {
    const filters = generateFilters(jobs);
    expect(filters.cantons).toEqual(["Zurich", "Bern"]);
  });

  it("should generate filters for workload", () => {
    const filters = generateFilters(jobs);
    expect(filters.workload).toEqual([40, 100]);
  });

  it("should generate filters for salary", () => {
    const filters = generateFilters(jobs);
    expect(filters.salary).toEqual([50000, 100000]);
  });

  it("should generate filters for home office", () => {
    const filters = generateFilters(jobs);
    expect(filters.homeOffice).toEqual([10, 60]);
  });

  it("should handle empty jobs array", () => {
    const filters = generateFilters([]);
    expect(filters).toEqual({});
  });

  it("should handle jobs with missing fields", () => {
    const incompleteJobs: Jobs["jobs"] = [
      {
        id: "4",
        jobLevel: "senior",
        companySize: "large",
        address: { canton: "Zurich" },
        technologies: [],
        workload: [],
        salary: { amount: [] },
        homeOffice: [],
      },
      { id: "5", homeOffice: [10, 30] },
    ];
    const filters = generateFilters(incompleteJobs);
    expect(filters.technologies).toEqual(undefined);
    expect(filters.jobLevels).toEqual(["senior"]);
    expect(filters.companySizes).toEqual(["large"]);
    expect(filters.cantons).toEqual(["Zurich"]);
    expect(filters.workload).toEqual(undefined);
    expect(filters.salary).toEqual(undefined);
    expect(filters.homeOffice).toEqual([10, 30]);
  });
});
