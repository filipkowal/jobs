import { test, expect, Locator } from "@playwright/test";

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

  await expect(applyButton).toBeDisabled();
  await expect(applyButton).toBeEnabled();

  const finalCount = await getJobCount(applyButton);
  expect(finalCount).toBeLessThan(initialCount);
});

async function getJobCount(applyButton: Locator) {
  await expect(applyButton).toHaveText(/Apply Filters \(\d+\)/i);
  const text = await applyButton.innerText();

  const regex = /\((\d+)\)/;
  const match = regex.exec(text);
  if (!match?.[1]) throw new Error("Job count not found in: " + text);
  return Number(match[1]);
}
