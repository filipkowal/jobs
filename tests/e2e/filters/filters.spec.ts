import { test, expect } from "@playwright/test";
import { getJobCount, getDictionary } from "./helpers";
import { FILTER_BUTTON_NAMES } from "@/utils/constants";

test("Filter buttons are visible", async ({ page }) => {
  await page.goto("/");
  const dict = await getDictionary("en");

  for (const filterName of FILTER_BUTTON_NAMES) {
    await expect(
      page.getByRole("button", { name: dict["filtersSection"][filterName] })
    ).toBeVisible();
  }
});

test("Applying region filter updates job count", async ({ page }) => {
  await page.goto("/");

  const regionsButton = page.getByText("Regions");

  regionsButton.click();

  expect(
    page.getByRole("heading", {
      name: /filters/i,
    })
  ).toBeVisible();

  const applyButton = page.getByRole("button", {
    name: /apply filters/i,
  });
  expect(applyButton).toBeVisible();

  const initialCount = await getJobCount(applyButton);

  const zurichCheckbox = page.getByRole("checkbox", {
    name: /canton of zurich/i,
  });

  await expect(zurichCheckbox).toBeVisible();
  await zurichCheckbox.click();

  await expect(applyButton).toBeEnabled();

  const finalCount = await getJobCount(applyButton);
  expect(finalCount).toBeLessThan(initialCount);
});
