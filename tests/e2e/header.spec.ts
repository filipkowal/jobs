import { test, expect } from "@playwright/test";

test("Compare Button disabled if less then 1 jobs pinned", async ({ page }) => {
  await page.goto("/");

  const jobs = page.getByTestId("job-row-accordion");
  const job1 = jobs.first();
  const job2 = jobs.nth(1);

  await expect(job1).toBeVisible();
  await expect(job2).toBeVisible();

  const compareButton = page.getByRole("button", {
    name: /compare/i,
  });
  await expect(compareButton).toBeVisible();
  await expect(compareButton).toBeDisabled();

  const pinButton1 = job1.getByTestId("pinButton");
  await pinButton1.click();

  await expect(compareButton).toBeDisabled();
});

test("Can redirect to Compare Page if 2 jobs are pinned", async ({ page }) => {
  await page.goto("/");

  const jobs = page.getByTestId("job-row-accordion");
  const job1 = jobs.first();
  const job2 = jobs.nth(1);

  await expect(job1).toBeVisible();
  await expect(job2).toBeVisible();

  const pinButton1 = job1.getByTestId("pinButton");
  await pinButton1.click();

  const pinButton2 = job2.getByTestId("pinButton");
  await pinButton2.click();

  const compareButton = page.getByRole("button", {
    name: /compare/i,
  });
  await expect(compareButton).toBeVisible();
  await expect(compareButton).toBeEnabled();

  await expect(compareButton.getByText("2")).toBeVisible();

  await compareButton.click();

  await expect(
    page.getByRole("button", {
      name: /apply for 2 jobs/i,
    })
  ).toBeVisible();
});
