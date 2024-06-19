import { test as base, Page, Locator } from "@playwright/test";

const test = base.extend<{
  pageWithJob: { page: Page; job: Locator };
  shareModalOpened: { page: Page; job: Locator };
  shareModalWithLink: { page: Page; shareLinkInput: Locator };
  bookmarkModal: { page: Page; sendButton: Locator; emailInput: Locator };
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

    // Mock the POST request to the API
    await page.route("**/en/refer", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify("https://test.digitalent.cloud/s/test-id"),
      });
    });

    const emailInput = page.getByLabel(/email.*\**/i);
    await emailInput.fill("test@test.test");
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
  bookmarkModal: async ({ pageWithJob }, use) => {
    const { page, job } = pageWithJob;
    const bookmarkButton = job.getByRole("button", {
      name: /bookmark job and apply later/i,
    });
    await bookmarkButton.click();
    const sendButton = page.getByRole("button", {
      name: /send this job to my mailbox/i,
    });
    const emailInput = page.getByLabel(/email.*\**/i);

    await use({ page, sendButton, emailInput });
  },
});

export { test };
