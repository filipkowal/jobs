import { SERVER_URL } from "./constants";
import type { Locale } from "../i18n-config";

export async function postData(endpoint: string, locale: Locale, data: any) {
  const url = `${SERVER_URL}/${locale}/${endpoint}`;
  const rawResponse = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!rawResponse.ok) {
    throw new Error(rawResponse.statusText);
  }

  const content = await rawResponse.json();
  return content;
}
