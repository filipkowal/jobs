import { test, expect } from "@playwright/test";

test("Job can be opened", async ({ page }) => {
  await page.goto("/");

  const jobs = page.getByTestId("job-row-accordion");
  const job = jobs.first();

  await expect(job).toBeVisible();

  job.click();

  await expect(
    job.getByRole("button", {
      name: /more info & apply/i,
    })
  ).toBeVisible();

  await expect(
    job.getByRole("button", {
      name: /share & earn 500 chf/i,
    })
  ).toBeVisible();

  await expect(
    job.getByRole("button", {
      name: /bookmark job and apply later/i,
    })
  ).toBeVisible();
});
