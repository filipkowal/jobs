import { FILTER_NAMES } from "@/utils/constants";
import { test as base, Page, Locator } from "@playwright/test";
import { Dictionary, getDictionary } from "./helpers";

type Filter = { name: string; heading: Locator }[];

export const test = base.extend<{
  filterModal: {
    page: Page;
    filterAccordions: Filter;
    dict: Dictionary["filtersSection"];
  };
  shareModalOpened: { page: Page; job: Locator };
  shareModalWithLink: { page: Page; shareLinkInput: Locator };
  bookmarkModal: { page: Page; sendButton: Locator; emailInput: Locator };
}>({
  page: async ({ page }, use) => {
    await page.goto("/");

    await use(page);
  },
  filterModal: async ({ page }, use) => {
    await page.goto("/");
    const dictionary = await getDictionary("en");
    const dict = dictionary["filtersSection"];

    const moreButton = page.getByRole("button", {
      name: /more\.\.\./i,
    });

    moreButton.click();

    let filterAccordions: Filter = [];
    for (const filterName of FILTER_NAMES) {
      filterAccordions.push({
        name: filterName,
        heading: page.getByRole("heading", {
          name: dict[filterName],
        }),
      });
    }
    await use({ page, filterAccordions, dict });
  },
});
