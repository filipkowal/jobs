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

test("Region filter can be applied", async ({ page }) => {
  await page.goto("/");

  const regionsButton = page.getByText("Regions");

  regionsButton.click();

  expect(
    page.getByRole("heading", {
      name: /filters/i,
    })
  ).toBeVisible();

  const applyButton = page.getByRole("button", {
    name: /apply filters/i,
  });
  expect(applyButton).toBeVisible();

  const zurichCheckbox = page.getByRole("checkbox", {
    name: /canton of zurich/i,
  });

  await expect(zurichCheckbox).toBeVisible();
  await zurichCheckbox.click();

  await expect(applyButton).toBeEnabled();
  await applyButton.click();

  const jobs = page.getByTestId("job-row-accordion");
  const job = jobs.first();

  await expect(job.getByText("Zürich")).toBeVisible();
});

test("Pinned jobs appear on the Compare Page", async ({ page }) => {
  await page.goto("/");
});
