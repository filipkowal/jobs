import { test } from "./fixtures";
import { expect } from "@playwright/test";

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
  await emailInput.fill("test@test.test");
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
