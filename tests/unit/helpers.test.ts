import { describe, it, expect } from "vitest";
import {
  capitalize,
  getShortId,
  pickActiveFiltersFromSearchParams,
} from "../../utils";
import { ReadonlyURLSearchParams } from "next/navigation";

describe("getShortId", () => {
  it("should return the last 6 characters of the string", () => {
    const result = getShortId("abcdefghijklmnopqrstuvwxyz");

    expect(result).toBe("uvwxyz");
  });

  it("should return an empty string if no string is provided", () => {
    const result = getShortId();

    expect(result).toBe("");
  });
});

describe("pickActiveFiltersFromSearchParams", () => {
  it("should return an empty object if searchParams is null", () => {
    const searchParams = null;
    const result = pickActiveFiltersFromSearchParams(searchParams);
    expect(result).toEqual({});
  });

  it("should return an empty object if searchParams is empty", () => {
    const searchParams = new URLSearchParams() as ReadonlyURLSearchParams;
    const result = pickActiveFiltersFromSearchParams(searchParams);
    expect(result).toEqual({});
  });

  it("should return an object with active filters and skip other params", () => {
    const searchParams = new URLSearchParams(
      "careerFields=foo&careerFields=bar&homeOffice=70&fake=fake&fakeNumber=1"
    ) as ReadonlyURLSearchParams;

    const result = pickActiveFiltersFromSearchParams(searchParams);
    expect(result).toEqual({
      careerFields: ["foo", "bar"],
      homeOffice: 70,
    });
  });
});

describe("capitalize", () => {
  it("should capitalize the first letter and add spaces before uppercase letters", () => {
    expect(capitalize("testString")).toBe("Test String");
  });

  it("should handle strings that start with an uppercase letter correctly", () => {
    expect(capitalize("TestString")).toBe("Test String");
  });

  it("should not add extra spaces for consecutive uppercase letters", () => {
    expect(capitalize("APITest")).toBe("API Test");
  });

  it("should return an empty string when given an empty string", () => {
    expect(capitalize("")).toBe("");
  });

  it("should handle strings with no uppercase letters", () => {
    expect(capitalize("test")).toBe("Test");
  });

  it("should handle single-letter strings correctly", () => {
    expect(capitalize("t")).toBe("T");
    expect(capitalize("T")).toBe("T");
  });
});
