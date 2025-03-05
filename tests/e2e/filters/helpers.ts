import { type Locale, i18n } from "@/i18n-config";
import { Locator, expect } from "@playwright/test";
import { readFileSync } from 'fs';
import { join } from 'path';

export async function getJobCount(applyButton: Locator) {
  await expect(applyButton).toHaveText(/Apply Filters \(\d+\)/i);
  const text = await applyButton.innerText();

  const regex = /\((\d+)\)/;
  const match = regex.exec(text);
  if (!match?.[1]) throw new Error("Job count not found in: " + text);
  return Number(match[1]);
}

const dictionaries = {
  en: JSON.parse(readFileSync(join(__dirname, '../../../dictionaries/en.json'), 'utf8')),
  de: JSON.parse(readFileSync(join(__dirname, '../../../dictionaries/de.json'), 'utf8')),
  fr: JSON.parse(readFileSync(join(__dirname, '../../../dictionaries/fr.json'), 'utf8')),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale];

export type Dictionary = typeof dictionaries.en;
