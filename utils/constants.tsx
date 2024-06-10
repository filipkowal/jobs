import { ActiveFilterName } from "./types";

export const SERVER_URL = "https://vertical.digitalent.cloud/api/vertical";
export const MOCK_SERVER_URL =
  "https://virtserver.swaggerhub.com/filipkowal/jobs/1.0";

export const JOBS_LIMIT = 20;
export const JOBS_REVALIDATE_TIME = 60 * 60; // 1 hour

export const FILTER_NAMES = [
  "regions",
  "careerFields",
  "technologies",
  "jobLevels",
  "salary",
  "workload",
  "homeOffice",
  "industries",
  "companySizes",
  "workLanguages",
] as const;

export const FILTER_BUTTON_NAMES = [
  "regions",
  "careerFields",
  "salary",
  "workload",
  "industries",
  "companySizes",
  "workLanguages",
] as const;

export const ACTIVE_FILTER_NAMES: ActiveFilterName[] = [
  "careerFields",
  "workLanguages",
  "technologies",
  "industries",
  "companySizes",
  "jobLevels",
  "workload",
  "homeOffice",
  "states",
  "salary",
];

export const ALL_REGIONS = {
  en: [
    {
      name: "Zurich / Schaffhausen region",
      states: ["Canton of Zurich", "Canton of Schaffhausen"],
    },
    {
      name: "Mittelland region",
      states: ["Canton of Aargau", "Canton of Solothurn"],
    },
    {
      name: "Bern region",
      states: ["Canton of Bern"],
    },
    {
      name: "Southern Switzerland region",
      states: ["Canton of Tessin"],
    },
    {
      name: "Central Switzerland region",
      states: [
        "Canton of Lucerne",
        "Canton of Nidwalden",
        "Canton of Schwyz",
        "Canton of Uri",
        "Canton of Zug",
      ],
    },
    {
      name: "Basel region",
      states: ["Canton of Basel-Stadt", "Canton of Basel-Landschaft"],
    },
    {
      name: "Eastern Switzerland region",
      states: [
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
      states: [
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
      states: ["Kanton Zürich", "Kanton Schaffhausen"],
    },
    {
      name: "Region Mittelland",
      states: ["Kanton Aargau", "Kanton Solothurn"],
    },
    {
      name: "Region Bern",
      states: ["Kanton Bern"],
    },
    {
      name: "Region Südschweiz",
      states: ["Kanton Tessin"],
    },
    {
      name: "Region Zentralschweiz",
      states: [
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
      states: ["Kanton Basel-Stadt", "Kanton Basel-Landschaft"],
    },
    {
      name: "Region Ostschweiz",
      states: [
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
      states: [
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
      states: ["Canton de Zurich", "Canton de Schaffhouse"],
    },
    {
      name: "Région du mittelland",
      states: ["Canton d'Argovie", "Canton de Soleure"],
    },
    {
      name: "Région de Berne",
      states: ["Canton de Berne"],
    },
    {
      name: "Région Suisse du Sud",
      states: ["Canton du Tessin"],
    },
    {
      name: "Région centrale de Suisse",
      states: [
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
      states: ["Canton de Bâle-Ville", "Canton de Bâle-Campagne"],
    },
    {
      name: "Région de la Suisse orientale",
      states: [
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
      states: [
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
