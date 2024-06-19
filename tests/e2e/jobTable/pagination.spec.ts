import { expect, test } from "@playwright/test";

test("Clicking next button changes page", async ({ page }) => {
  await page.goto("/");
  const nextButton = page.getByRole("button", { name: "Next" });
  const job1 = page.getByTestId("job-row-accordion").first();

  await nextButton.click();

  const job2 = page.getByTestId("job-row-accordion").first();
  await expect(job1).not.toBeVisible();
  await expect(job2).toBeVisible();

  const prevButton = page.getByRole("button", { name: /previous/i });
  expect(prevButton).toBeVisible();
});
