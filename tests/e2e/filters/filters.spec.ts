import { expect } from "@playwright/test";
import { getJobCount, getDictionary } from "./helpers";
import { FILTER_BUTTON_NAMES } from "@/utils/constants";
import { test } from "./fixtures";

test("Filter buttons are visible", async ({ page }) => {
  const dict = await getDictionary("en");

  for (const filterName of FILTER_BUTTON_NAMES) {
    await expect(
      page.getByRole("button", { name: dict["filtersSection"][filterName] })
    ).toBeVisible();
  }
});

test("Clicking More button shows all filters in modal", async ({
  filterModal,
}) => {
  const { filterAccordions } = filterModal;

  for (const filter of filterAccordions) {
    await expect(filter.heading).toBeVisible();
  }
});

test("Applying all filters updates job count", async ({ filterModal }) => {
  const { filterAccordions, modal } = filterModal;

  const applyButton = modal.getByRole("button", {
    name: /apply filters/i,
  });
  expect(applyButton).toBeVisible();
  const initialCount = await getJobCount(applyButton);

  for (const filter of filterAccordions) {
    await filter.heading.click();
  }

  // Regions
  const zurichCheckbox = modal.getByRole("checkbox", {
    name: /canton of zurich/i,
  });

  await expect(zurichCheckbox).toBeVisible();
  await zurichCheckbox.click();

  // Career Fields
  const engineeringTag = modal.getByText(/system engineering/i);
  await expect(engineeringTag).toBeVisible();
  await engineeringTag.click();

  // Technologies
  const m365Tag = modal.getByText(/m365/i);
  await expect(m365Tag).toBeVisible();
  await m365Tag.click();

  // Industries
  const iTAndTelecomTag = modal.getByText(/it & telecommunications/i);
  await expect(iTAndTelecomTag).toBeVisible();
  await iTAndTelecomTag.click();

  // Company Sizes
  const smallTag = modal.getByText(/small \(≤ 50\)/i);
  await expect(smallTag).toBeVisible();
  await smallTag.click();

  // @fixme: Add range filters
  // Salary
  // const minSalary = modal.getByRole("slider", { name: /min\-min\. salary/i });

  // Check job count change
  await expect(applyButton).toBeEnabled();
  const finalCount = await getJobCount(applyButton);
  expect(finalCount).toBeLessThan(initialCount);
  console.log(`Initial: ${initialCount}, Final: ${finalCount}`);
});

test("Clicking region button opens modal with regions filter", async ({
  page,
}) => {
  const regionsButton = page.getByText("Regions");

  await regionsButton.click();

  await expect(
    page.getByRole("heading", {
      name: /filters/i,
    })
  ).toBeVisible();

  await expect(page.getByText(/canton of zurich/i)).toBeVisible();
  await expect(
    page.getByRole("checkbox", {
      name: /canton of zurich/i,
    })
  ).toBeVisible();
});
