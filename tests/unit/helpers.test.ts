import { describe, it, expect } from "vitest";
import { getShortId } from "../../utils";

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
