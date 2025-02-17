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

const isSalaryType = (filterName) => {
  return !!filterName?.hasOwnProperty("amount") && filterName === "salary";
};

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

      if (["jobLevel", "companySizes"].includes(key)) {
        filters[key] = filters[key]
          ? !filters[key].includes(value)
            ? [...filters[key], value]
            : filters[key]
          : [value];
      } else if (isStringArr(value)) {
        filters[key] = filters[key]
          ? [...filters[key], ...value.filter((v) => !filters[key].includes(v))]
          : [...value];
      } else if (isNumberTuple(value)) {
        let v = value;
        if (isSalaryType(value) && isNumberTuple(value.amount)) {
          v = value.amount;
        }
        const [min, max] = filters[key] || [Infinity, 0];
        filters[key] = [Math.min(min, value[0]), Math.max(max, value[1])];
      }
    });
  });

  return filters;
}

async function saveData() {
  const customBoard = await loadCustomBoard();
  const boardId = customBoard?.id;

  for (const locale of LOCALES) {
    console.log(`Fetching jobs for ${locale}...`);

    const jobs = await fetch(`${SERVER_URL}/${locale}/jobs`, {
      headers: { "Custom-Board-Id": boardId || "" },
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

    console.log(`Saved jobs and filters for ${locale}`);
  }
}

saveData().catch((err) => console.error("Error:", err));
