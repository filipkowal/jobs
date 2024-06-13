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

test("Clicking More Info button has an external link", async ({
  pageWithJob,
}) => {
  const { job } = pageWithJob;
  const moreInfoLink = job.getByRole("link", { name: /more info & apply/i });
  await expect(moreInfoLink).toHaveAttribute("href");
  await expect(moreInfoLink).toHaveAttribute("target", "_blank");
  await expect(moreInfoLink).not.toHaveAttribute(
    "href",
    /.*jobs.digitalent.cloud.*/
  );
});

test("Clicking Share & Earn button opens a modal", async ({
  shareModalOpened,
}) => {
  const { page } = shareModalOpened;
  await expect(page.getByText(/share a job/i)).toBeVisible();
});

test("Share modal button is only enabled if email is valid and terms are accepted", async ({
  shareModalOpened,
}) => {
  const { page } = shareModalOpened;
  const createLinkButton = page.getByRole("button", { name: /create a link/i });
  const emailInput = page.getByLabel(/email.*\**/i);

  const termsCheckbox = page.getByRole("checkbox", {
    name: /i have read and agree to the terms of use\. \*/i,
  });
  await termsCheckbox.check();

  // disabled if email is not valid
  await emailInput.fill("invalidEmail");
  await expect(createLinkButton).toBeDisabled();

  // enabled if email is valid
  await emailInput.fill("a@a.de");
  await expect(createLinkButton).toBeEnabled();

  // disabled if terms are not accepted
  await termsCheckbox.uncheck();
  await expect(createLinkButton).toBeDisabled();
});

test("Creates a share link and copies it", async ({ shareModalWithLink }) => {
  const { page, shareLinkInput } = shareModalWithLink;
  await expect(
    page.getByText(/it's your link\. now you just have to share it\./i)
  ).toBeVisible();
  await expect(shareLinkInput).toHaveValue(/http/);

  const copyButton = page.getByRole("button", { name: /copy/i });
  await copyButton.click();

  const pastedLink = await page.evaluate(() => navigator.clipboard.readText());
  expect(pastedLink).toContain(await shareLinkInput.inputValue());
});
