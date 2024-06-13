import { test, expect } from "@playwright/test";

test("Titles, filters, jobs and cookie notice are visible", async ({
  page,
}) => {
  await page.goto("/");

  // Check that the page title is correct
  await expect(
    page.getByRole("heading", { name: "Ready for a new mission?" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Discover selected career" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "With guaranteed feedback" })
  ).toBeVisible();

  // Check that the filters are visible
  await expect(page.getByText("Regions")).toBeVisible();
  await expect(page.getByText("Career Fields")).toBeVisible();

  // Check that the jobs are visible
  const jobs = page.getByTestId("job-row-accordion");
  const job = jobs.first();
  await expect(job).toBeVisible();
  await expect(job.getByText("CHF")).toBeVisible();

  // Check that the cookie notice is visible
  await expect(
    page.getByRole("heading", { name: "Cookie notice" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Accept" })).toBeVisible();
  await expect(page.getByText("EN", { exact: true })).toBeVisible();
});
