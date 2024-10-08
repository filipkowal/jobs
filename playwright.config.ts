import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  testDir: "./tests/e2e",
};
export default config;
