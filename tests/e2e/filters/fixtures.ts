import { FILTER_NAMES } from "@/utils/constants";
import { test as base, Page, Locator } from "@playwright/test";
import { Dictionary, getDictionary } from "./helpers";

type Filter = { name: string; heading: Locator }[];

export const test = base.extend<{
  filterModal: {
    page: Page;
    filterAccordions: Filter;
    dict: Dictionary["filtersSection"];
    modal: Locator;
  };
}>({
  page: async ({ page }, use) => {
    await page.goto("/");

    await use(page);
  },
  filterModal: async ({ page }, use) => {
    const dictionary = await getDictionary("en");
    const dict = dictionary["filtersSection"];

    await page.goto("/");

    const moreButton = page.getByRole("button", {
      name: /more\.\.\./i,
    });

    moreButton.click();

    const modal = page.getByRole("dialog", {
      name: /filters/i,
    });

    let filterAccordions: Filter = [];

    for (const filterName of FILTER_NAMES) {
      filterAccordions.push({
        name: filterName,
        heading: page.getByRole("heading", {
          name: dict[filterName],
        }),
      });
    }
    await use({ page, filterAccordions, dict, modal });
  },
});
