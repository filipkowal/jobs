import fs from "fs/promises"; // Use fs.promises for async/await
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const SERVER_URL = "https://vertical.digitalent.cloud/api/vertical";
const LOCALES = ["en", "de", "fr"];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadCustomBoard() {
  const filePath = path.join(__dirname, "../../customBoard.json");
  const data = await fs.readFile(filePath, "utf-8"); // Read file asynchronously
  return JSON.parse(data);
}

const isStringArr = (value) => {
  return (
    Array.isArray(value) && value.length > 0 && typeof value[0] === "string"
  );
};

const isNumberTuple = (value) => {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
};

function generateFilters(jobs) {
  const filters = {};

  jobs?.forEach((job) => {
    Object.keys(job).forEach((key) => {
      const value = job[key];

      if (key === "tags") return;

      if (["jobLevel", "companySizes", "address"].includes(key)) {
        // String filters
        let v = value;
        let k = key;
        if (key === "address") {
          v = value.state;
          k = "cantons";
        }
        if (key === "jobLevel") {
          k = "jobLevels";
        }

        filters[k] = filters[k]
          ? filters[k].includes(v)
            ? filters[k]
            : [...filters[k], v]
          : [v];
        return;
      }

      if (isStringArr(value)) {
        // Array of strings filters
        filters[key] = filters[key]
          ? [...filters[key], ...value.filter((v) => !filters[key].includes(v))]
          : [...value];
        return;
      }

      if (isNumberTuple(value) || key === "salary") {
        // Number range filters
        let v = value;
        if (key === "salary" && isNumberTuple(value?.amount)) {
          v = value.amount;
        }
        const [min, max] = v || [Infinity, 0];
        filters[key] = [Math.min(min, v[0]), Math.max(max, v[1])];
        return;
      }
    });
  });

  return filters;
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
