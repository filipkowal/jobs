import { test, expect, Locator, Page } from "@playwright/test";

test("Job can be opened", async ({ page }) => {
  const job = await getFirstJob(page);
  await assertJobIsOpen(job);
});

test("Clicking More Info button has an external link", async ({ page }) => {
  const job = await getFirstJob(page);
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

test("Clicking Share & Earn button opens a modal", async ({ page }) => {
  const job = await getFirstJob(page);
  await assertJobIsOpen(job);
});

async function getFirstJob(page: Page) {
  await page.goto("/");
  return page.getByTestId("job-row-accordion").first();
}

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
