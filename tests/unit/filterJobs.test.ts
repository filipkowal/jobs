import { describe, it, expect } from "vitest";
import filterJobs from "../../app/api/[locale]/jobs/filterJobs";
import { Jobs, ActiveFilters } from "@/utils";
import jobsData from "./jobsMock.json";

describe("filterJobs", () => {
  const jobs: Jobs["jobs"] = jobsData.jobs;

  describe("Technology filters", () => {
    it("should filter jobs by single technology", () => {
      const filters: ActiveFilters = { technologies: ["react"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(2);
      expect(result.map(job => job.id)).toEqual(["1", "3"]);
    });

    it("should filter jobs by multiple technologies", () => {
      const filters: ActiveFilters = { technologies: ["react", "python"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(3);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("3");
      expect(result[2].id).toBe("5");
    });

    it("should handle jobs with empty technologies array", () => {
      const filters: ActiveFilters = { technologies: ["java"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });
  });

  describe("Job Level filters", () => {
    it("should filter jobs by single level", () => {
      const filters: ActiveFilters = { jobLevels: ["senior"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(2);
      expect(result.map(job => job.id)).toEqual(["1", "4"]);
    });

    it("should filter jobs by multiple levels", () => {
      const filters: ActiveFilters = { jobLevels: ["senior", "internship"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(3);
      expect(result.map(job => job.id)).toEqual(["1", "4", "5"]);
    });
  });

  describe("Company Size filters", () => {
    it("should filter jobs by company size", () => {
      const filters: ActiveFilters = { companySizes: ["large"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(2);
      expect(result.map(job => job.id)).toEqual(["1", "4"]);
    });

    it("should handle startup company size", () => {
      const filters: ActiveFilters = { companySizes: ["startup"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("5");
    });
  });

  describe("Location filters", () => {
    it("should filter jobs by single canton", () => {
      const filters: ActiveFilters = { cantons: ["Zurich"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(2);
      expect(result.map(job => job.id)).toEqual(["1", "3"]);
    });

    it("should filter jobs by multiple cantons", () => {
      const filters: ActiveFilters = { cantons: ["Zurich", "Geneva"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(3);
      expect(result.map(job => job.id)).toEqual(["1", "3", "4"]);
    });
  });

  describe("Workload filters", () => {
    it("should filter jobs by workload range", () => {
      const filters: ActiveFilters = { workload: [70, 90] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(3);
      expect(result.map(job => job.id)).toEqual(["1", "2", "5"]);
    });

    it("should handle exact workload match", () => {
      const filters: ActiveFilters = { workload: [100, 100] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(3);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("4");
      expect(result[2].id).toBe("5");
    });
  });

  describe("Salary filters", () => {
    it("should filter jobs by minimum salary", () => {
      const filters: ActiveFilters = { salary: 90000 };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(2);
      expect(result.map(job => job.id)).toEqual(["1", "4"]);
    });

    it("should handle edge case salaries", () => {
      const filters: ActiveFilters = { salary: 25000 };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(5); // All jobs have max salary above 25000
    });
  });

  describe("Home Office filters", () => {
    it("should filter jobs by minimum home office percentage", () => {
      const filters: ActiveFilters = { homeOffice: 50 };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(2);
      expect(result.map(job => job.id)).toEqual(["1", "5"]);
    });

    it("should handle full remote jobs", () => {
      const filters: ActiveFilters = { homeOffice: 80 };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("5");
    });
  });

  describe("Career Fields filters", () => {
    it("should filter jobs by career field", () => {
      const filters: ActiveFilters = { careerFields: ["Data Science"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(2);
      expect(result.map(job => job.id)).toEqual(["3", "5"]);
    });
  });

  describe("Industry filters", () => {
    it("should filter jobs by industry", () => {
      const filters: ActiveFilters = { industries: ["Banking & Financial Services"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(2);
      expect(result.map(job => job.id)).toEqual(["2", "4"]);
    });
  });

  describe("Multiple filters", () => {
    it("should combine multiple filters with AND logic", () => {
      const filters: ActiveFilters = {
        technologies: ["react"],
        jobLevels: ["senior"],
        workload: [70, 100],
        salary: 80000,
        homeOffice: 30
      };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should handle complex filter combinations", () => {
      const filters: ActiveFilters = {
        technologies: ["python"],
        careerFields: ["Data Science"],
        homeOffice: 50
      };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("5");
    });
  });

  describe("Edge cases", () => {
    it("should return all jobs if no filters are applied", () => {
      const filters: ActiveFilters = {};
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(5);
    });

    it("should return no jobs if filters do not match any job", () => {
      const filters: ActiveFilters = { technologies: ["nonexistent"] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(0);
    });

    it("should handle empty jobs array", () => {
      const filters: ActiveFilters = { technologies: ["react"] };
      const result = filterJobs([], filters)!;
      expect(result).toHaveLength(0);
    });

    it("should handle filters with undefined values", () => {
      const filters: ActiveFilters = { technologies: undefined };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(5);
    });

    it("should handle filters with empty arrays", () => {
      const filters: ActiveFilters = { technologies: [] };
      const result = filterJobs(jobs, filters)!;
      expect(result).toHaveLength(5);
    });
  });
});
