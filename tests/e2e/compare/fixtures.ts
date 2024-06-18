import { Locator, Page, test as base, expect } from "@playwright/test";

const test = base.extend<{
  comparePage: { page: Page };
  applicationBasket: { page: Page; basket: Locator; list: Locator };
}>({
  comparePage: async ({ page }, use) => {
    await page.goto("/");

    const cookiAcceptButton = page.getByRole("button", { name: "Accept" });
    await cookiAcceptButton.click();

    const job1 = page.getByTestId("job-row-accordion").first();
    const job2 = page.getByTestId("job-row-accordion").nth(1);

    const pin1 = job1.getByTestId("pinButton");
    const pin2 = job2.getByTestId("pinButton");
    const compareButton = page.getByRole("button", {
      name: /compare/i,
    });

    await expect(compareButton).toBeDisabled();
    await pin1.click();
    await pin2.click();
    await expect(compareButton).toBeEnabled();

    await compareButton.click();

    await use({ page });
  },
  applicationBasket: async ({ comparePage }, use) => {
    const { page } = comparePage;
    const applyButton = page.getByRole("button", {
      name: /apply for 2 jobs/i,
    });
    await applyButton.click();

    const basket = page.getByTestId("applicationBasket");
    const list = basket.getByRole("list");
    await use({ page, basket, list });
  },
});

export { test };
