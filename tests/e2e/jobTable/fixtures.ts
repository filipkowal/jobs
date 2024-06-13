import { test as base, Page, Locator } from "@playwright/test";

const test = base.extend<{
  pageWithJob: { page: Page; job: Locator };
  shareModalOpened: { page: Page; job: Locator };
  shareModalWithLink: { page: Page; shareLinkInput: Locator };
}>({
  pageWithJob: async ({ page }, use) => {
    await page.goto("/");
    const job = page.getByTestId("job-row-accordion").first();
    await job.click();
    await use({ page, job });
  },
  shareModalOpened: async ({ pageWithJob }, use) => {
    const { page, job } = pageWithJob;
    const shareButton = job.getByRole("button", {
      name: /share & earn 500 chf/i,
    });
    await shareButton.click();
    await use({ page, job });
  },
  shareModalWithLink: async ({ shareModalOpened }, use) => {
    const { page } = shareModalOpened;
    const emailInput = page.getByLabel(/email.*\**/i);
    await emailInput.fill("a@a.de");
    const termsCheckbox = page.getByRole("checkbox", {
      name: /i have read and agree to the terms of use\. \*/i,
    });
    await termsCheckbox.check();
    const createLinkButton = page.getByRole("button", {
      name: /create a link/i,
    });
    await createLinkButton.click();
    const shareLinkInput = page.getByRole("textbox");
    await use({ page, shareLinkInput });
  },
});

export { test };
