import { ActiveFilterName } from "./types";

export const SERVER_URL = "https://vertical.digitalent.cloud/api/vertical";
export const MOCK_SERVER_URL =
  "https://virtserver.swaggerhub.com/filipkowal/jobs/1.0";

export const JOBS_LIMIT = 20;

export const FILTER_NAMES: ActiveFilterName[] = [
  "cantons",
  "careerFields",
  "technologies",
  "industries",
  "companySizes",
  "jobLevels",
  "workload",
  "homeOffice",
  "salary",
] as const;

export const FILTER_BUTTON_NAMES = [
  "cantons",
  "careerFields",
  "salary",
  "workload",
  "industries",
  "companySizes",
] as const;

export const ALL_REGIONS = {
  en: [
    {
      name: "Zurich / Schaffhausen region",
      cantons: ["Canton of Zurich", "Canton of Schaffhausen"],
    },
    {
      name: "Mittelland region",
      cantons: ["Canton of Aargau", "Canton of Solothurn"],
    },
    {
      name: "Bern region",
      cantons: ["Canton of Bern"],
    },
    {
      name: "Southern Switzerland region",
      cantons: ["Canton of Tessin"],
    },
    {
      name: "Central Switzerland region",
      cantons: [
        "Canton of Lucerne",
        "Canton of Nidwalden",
        "Canton of Schwyz",
        "Canton of Uri",
        "Canton of Zug",
      ],
    },
    {
      name: "Basel region",
      cantons: ["Canton of Basel-Stadt", "Canton of Basel-Landschaft"],
    },
    {
      name: "Eastern Switzerland region",
      cantons: [
        "Canton of Appenzell Ausserrhoden",
        "Canton of Appenzell Innerrhoden",
        "Canton of Glarus",
        "Canton of Grisons",
        "Canton of St. Gallen",
        "Canton of Thurgau",
      ],
    },
    {
      name: "Region Romandy",
      cantons: [
        "Canton of Fribourg",
        "Canton of Geneva",
        "Canton of Neuchâtel",
        "Canton of Vaud",
        "Canton of Valais",
        "Canton of Jura",
      ],
    },
  ],
  de: [
    {
      name: "Region Zürich / Schaffhausen",
      cantons: ["Kanton Zürich", "Kanton Schaffhausen"],
    },
    {
      name: "Region Mittelland",
      cantons: ["Kanton Aargau", "Kanton Solothurn"],
    },
    {
      name: "Region Bern",
      cantons: ["Kanton Bern"],
    },
    {
      name: "Region Südschweiz",
      cantons: ["Kanton Tessin"],
    },
    {
      name: "Region Zentralschweiz",
      cantons: [
        "Kanton Luzern",
        "Kanton Obwalden",
        "Kanton Nidwalden",
        "Kanton Schwyz",
        "Kanton Uri",
        "Kanton Zug",
      ],
    },
    {
      name: "Region Basel",
      cantons: ["Kanton Basel-Stadt", "Kanton Basel-Landschaft"],
    },
    {
      name: "Region Ostschweiz",
      cantons: [
        "Kanton Appenzell Ausserrhoden",
        "Kanton Appenzell Innerrhoden",
        "Kanton Glarus",
        "Kanton Graubünden",
        "Kanton St. Gallen",
        "Kanton Thurgau",
      ],
    },
    {
      name: "Region Westschweiz",
      cantons: [
        "Kanton Freiburg",
        "Kanton Genf",
        "Kanton Neuenburg",
        "Kanton Waadt",
        "Kanton Wallis",
        "Kanton Jura",
      ],
    },
  ],
  fr: [
    {
      name: "Région de Zurich / Schaffhausen",
      cantons: ["Canton de Zurich", "Canton de Schaffhouse"],
    },
    {
      name: "Région du mittelland",
      cantons: ["Canton d'Argovie", "Canton de Soleure"],
    },
    {
      name: "Région de Berne",
      cantons: ["Canton de Berne"],
    },
    {
      name: "Région Suisse du Sud",
      cantons: ["Canton du Tessin"],
    },
    {
      name: "Région centrale de Suisse",
      cantons: [
        "Canton de Lucerne",
        "Canton d'Obwald",
        "Canton de Nidwald",
        "Canton de Schwytz",
        "Canton d'Uri",
        "Canton de Zoug",
      ],
    },
    {
      name: "Région de Bâle",
      cantons: ["Canton de Bâle-Ville", "Canton de Bâle-Campagne"],
    },
    {
      name: "Région de la Suisse orientale",
      cantons: [
        "Canton de Appenzell Rhodes-Extérieures",
        "Canton de Appenzell Rhodes-Intérieures",
        "Canton de Glaris",
        "Canton des Grisons",
        "Canton de St.Gall",
        "Canton de Thurgovie",
      ],
    },
    {
      name: "Région Suisse romande",
      cantons: [
        "Canton de Fribourg",
        "Canton de Genève",
        "Canton de Neuchâtel",
        "Canton de Vaud",
        "Canton du Valais",
        "Canton du Jura",
      ],
    },
  ],
};
