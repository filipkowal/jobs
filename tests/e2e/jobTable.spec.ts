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

  await assertShareModalIsOpen(job, page);
});

test("Share modal button is only enabled if email is valid and terms are accepted", async ({
  page,
}) => {
  const job = await getFirstJob(page);
  await assertJobIsOpen(job);

  await assertShareModalIsOpen(job, page);

  const creatLinkButton = page.getByRole("button", {
    name: /create a link/i,
  });

  await expect(creatLinkButton).toBeDisabled();

  const emailInput = page.getByLabel(/email.*\**/i);
  await emailInput.fill("a@a.de");

  await expect(creatLinkButton).toBeDisabled();

  await page
    .getByRole("checkbox", {
      name: /i have read and agree to the terms of use\. \*/i,
    })
    .check();

  await expect(creatLinkButton).toBeEnabled();

  await emailInput.fill("invalidEmail");
  await expect(creatLinkButton).toBeDisabled();
});

test("Creates a share link", async ({ page }) => {
  const job = await getFirstJob(page);
  await assertJobIsOpen(job);

  await assertShareModalIsOpen(job, page);

  const emailInput = page.getByLabel(/email.*\**/i);
  await emailInput.fill("a@a.de");
  await page
    .getByRole("checkbox", {
      name: /i have read and agree to the terms of use\. \*/i,
    })
    .check();

  const creatLinkButton = page.getByRole("button", {
    name: /create a link/i,
  });
  await creatLinkButton.click();

  await expect(
    page.getByText(/it's your link\. now you just have to share it\./i)
  ).toBeVisible();

  const shareLinkInput = page.getByRole("textbox");

  const link = await shareLinkInput.inputValue();
  expect(link).toContain("http");

  // const copyButton = page.getByRole("button", {
  //   name: /copy/i,
  // });
  // await copyButton.click();

  // // expect the link to be in the clipboard
  // const pastedLink = await navigator.clipboard.readText();
  // expect(pastedLink).toContain(link);
});

// helper functions

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

async function assertShareModalIsOpen(job: Locator, page: Page) {
  const shareButton = job.getByRole("button", {
    name: /share & earn 500 chf/i,
  });
  await shareButton.click();

  await expect(page.getByText(/share a job/i)).toBeVisible();
}
