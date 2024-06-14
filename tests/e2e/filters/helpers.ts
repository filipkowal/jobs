import { type Locale, i18n } from "@/i18n-config";
import { Locator, expect } from "@playwright/test";

export async function getJobCount(applyButton: Locator) {
  await expect(applyButton).toHaveText(/Apply Filters \(\d+\)/i);
  const text = await applyButton.innerText();

  const regex = /\((\d+)\)/;
  const match = regex.exec(text);
  if (!match?.[1]) throw new Error("Job count not found in: " + text);
  return Number(match[1]);
}

const dictionaries = {
  en: () =>
    import("/home/f/projects/jobs/dictionaries/en.json").then(
      (module) => module.default
    ),
  de: () =>
    import("/home/f/projects/jobs/dictionaries/de.json").then(
      (module) => module.default
    ),
  fr: () =>
    import("/home/f/projects/jobs/dictionaries/fr.json").then(
      (module) => module.default
    ),
};
export const getDictionary = async (locale: Locale) =>
  dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]();
