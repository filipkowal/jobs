import { test } from "./fixtures";
import { expect } from "@playwright/test";

test("Job can be opened", async ({ pageWithJob }) => {
  const { job } = pageWithJob;
  await expect(job).toBeVisible();
  await expect(
    job.getByRole("button", { name: /more info & apply/i })
  ).toBeVisible();
  await expect(
    job.getByRole("button", { name: /share & earn 500 chf/i })
  ).toBeVisible();
  await expect(
    job.getByRole("button", { name: /bookmark job and apply later/i })
  ).toBeVisible();
});

test("More Info button has an external link", async ({ pageWithJob }) => {
  const { job } = pageWithJob;
  const moreInfoLink = job.getByRole("link", { name: /more info & apply/i });
  await expect(moreInfoLink).toHaveAttribute("href");
  await expect(moreInfoLink).toHaveAttribute("target", "_blank");
  await expect(moreInfoLink).not.toHaveAttribute(
    "href",
    /.*jobs.digitalent.cloud.*/
  );
});
