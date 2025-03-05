import { expect } from "@playwright/test";
import { getJobCount } from "./helpers";
import { FILTER_BUTTON_NAMES } from "@/utils/constants";
import { test } from "./fixtures";
import { readFileSync } from 'fs';
import { join } from 'path';
import { Job } from "@/utils";

const dict = JSON.parse(readFileSync(join(__dirname, '../../../dictionaries/en.json'), 'utf8'));
const jobsData = JSON.parse(readFileSync(join(__dirname, '../../../app/data/en/jobs.json'), 'utf8'));

test("Filter buttons are visible", async ({ page }) => {
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
  const { jobs } = jobsData as { jobs: Job[] };

  const applyButton = modal.getByRole("button", {
    name: /apply filters/i,
  });
  expect(applyButton).toBeVisible();
  const initialCount = await getJobCount(applyButton);

  // Get first available values from jobs data
  const canton = jobs?.[0]?.address?.canton || 'Canton of Zurich';
  const careerField = jobs?.[0]?.careerFields?.[0] || 'Software Development';
  const technology = jobs?.[0]?.technologies?.[0] || 'C#';
  const industry = jobs?.[0]?.industries?.[0] || 'IT & Telecommunications';
  const companySize = jobs?.[0]?.companySize || 'Small (≤ 50)';

  // Regions
  const cantonCheckbox = modal.getByRole("checkbox", { 
    name: canton,
    exact: true 
  });
  await expect(cantonCheckbox).toBeVisible();
  await cantonCheckbox.click();
  // close the regions filter so that the next filter is visible

  // Career Fields
  const careerFieldTag = modal.getByText(careerField, { exact: true });
  await expect(careerFieldTag).toBeVisible();
  await careerFieldTag.click();

  // @fixme: wait for the api to return the technologies
  // // Technologies
  // const technologyTag = modal.getByRole("button", { 
  //   name: technology,
  //   exact: true 
  // });
  // await expect(technologyTag).toBeVisible();
  // await technologyTag.click();

  // Industries
  const industryTag = modal.getByText(industry, { exact: true });
  await expect(industryTag).toBeVisible();
  await industryTag.click();

  // Company Sizes
  const companySizeTag = modal.getByText(companySize, { exact: true });
  await expect(companySizeTag).toBeVisible();
  await companySizeTag.click();

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
