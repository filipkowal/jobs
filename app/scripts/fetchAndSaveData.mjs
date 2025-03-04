import fs from "fs/promises"; // Use fs.promises for async/await
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import generateFilters from "./generateFilters.mjs";

const SERVER_URL = "https://vertical.digitalent.cloud/api/vertical";
const LOCALES = ["en", "de", "fr"];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadCustomBoard() {
  const filePath = path.join(__dirname, "../../customBoard.json");
  const data = await fs.readFile(filePath, "utf-8"); // Read file asynchronously
  return JSON.parse(data);
}

export async function fetchAndSaveData() {
  const customBoard = await loadCustomBoard();
  const boardId = customBoard?.id;

  for (const locale of LOCALES) {
    console.log(`Fetching jobs for ${locale}...`);

    const jobs = await fetch(`${SERVER_URL}/${locale}/jobs`, {
      headers: { "Board-Id": boardId || "" },
    }).then((res) => res.json());

    const filters = generateFilters(jobs?.jobs);

    const localeDir = path.join(__dirname, "..", "data", locale);

    // Use fs.access to check if the directory exists
    try {
      await fs.access(localeDir);
    } catch (err) {
      // If the directory doesn't exist, create it
      await fs.mkdir(localeDir, { recursive: true });
    }

    await fs.writeFile(
      path.join(localeDir, "jobs.json"),
      JSON.stringify(jobs, null, 2)
    );
    await fs.writeFile(
      path.join(localeDir, "filters.json"),
      JSON.stringify(filters, null, 2)
    );

    console.log(
      `Saved ${jobs?.length} jobs and ${
        Object.keys(filters)?.length
      } filters for ${locale}`
    );
  }
}

fetchAndSaveData();
