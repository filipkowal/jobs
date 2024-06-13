import { test, expect, Locator } from "@playwright/test";

test("Job can be opened", async ({ page }) => {
  await page.goto("/");

  const jobs = page.getByTestId("job-row-accordion");
  const job = jobs.first();

  await assertJobIsOpen(job);
});

test("Clicking More Info button has an external link", async ({ page }) => {
  await page.goto("/");

  const jobs = page.getByTestId("job-row-accordion");
  const job = jobs.first();

  await assertJobIsOpen(job);

  const moreInfoLink = job.getByRole("link", {
    name: /more info & apply/i,
  });

  console.log(moreInfoLink);

  await expect(moreInfoLink).toHaveAttribute("href");
  await expect(moreInfoLink).toHaveAttribute("target", "_blank");

  // morInfoLink has a href that does not include "jobs.digitalent.cloud"
  await expect(moreInfoLink).not.toHaveAttribute(
    "href",
    /.*jobs.digitalent.cloud.*/
  );
});

async function assertJobIsOpen(job: Locator) {
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
}
