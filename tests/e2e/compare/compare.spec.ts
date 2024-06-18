import { expect } from "@playwright/test";
import { test } from "./fixtures";

test("CompareButton disabled if less then 2 jobs pinned", async ({ page }) => {
  await page.goto("/");
  const compareButton = page.getByRole("button", { name: /compare/i });

  await expect(compareButton).toBeDisabled();

  const pinButtons = page.getByTestId("pinButton");
  await pinButtons.first().click();
  await expect(compareButton).toBeDisabled();

  await page.getByTestId("pinButton").nth(1).click();
  await expect(compareButton).toBeEnabled();
});

test("Can unpin jobs from Compare Page", async ({ comparePage }) => {
  const { page } = comparePage;
  await expect(page.getByTestId("pinButton")).toHaveCount(2);
  await page.getByTestId("pinButton").nth(1).click();
  await expect(page.getByTestId("pinButton")).toHaveCount(1);
});

test("Can unpin jobs from Application Basket", async ({
  applicationBasket,
}) => {
  const { list } = applicationBasket;

  await expect(list.getByRole("listitem")).toHaveCount(2);

  await list.getByTestId("remove-pinned-job").nth(1).click();
  await expect(list.getByRole("listitem")).toHaveCount(1);
});

test("Can apply to jobs", async ({ applicationBasket }) => {
  const { basket, page } = applicationBasket;
  await basket.getByRole("button", { name: /apply for 2 jobs/i }).click();

  expect(page.getByRole("heading", { name: /about you/i })).toBeVisible();

  const womanCheckbox = page.getByRole("checkbox", { name: /woman/i });
  const emailInput = page.getByRole("textbox", { name: /email \*/i });
  const directlyCheckbox = page.getByRole("checkbox", {
    name: /i am applying directly/i,
  });
  const termsCheckbox = page.getByRole("checkbox", {
    name: /\* i have read the information on the privacy & recruitment process read and agree with it/i,
  });
  const nextButton = page.getByRole("button", { name: /next/i });

  await womanCheckbox.check();
  await emailInput.fill("test@test.test");
  await directlyCheckbox.check();
  await termsCheckbox.check();

  expect(nextButton).toBeEnabled();
  await nextButton.click();

  await expect(
    page.getByText(
      /thank you very much for contacting us\. we will get back to you within 2 working days!/i
    )
  ).toBeVisible();
});
