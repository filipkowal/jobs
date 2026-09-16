import { PlaywrightTestConfig } from "@playwright/test";

const port = process.env.PORT || "3000";

const config: PlaywrightTestConfig = {
  use: {
    baseURL:
      process.env.PLAYWRIGHT_TEST_BASE_URL || `http://localhost:${port}`,
    permissions: ["clipboard-read", "clipboard-write"],
  },
  testDir: "./tests/e2e",
  webServer: {
    command: `npm run dev -- -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        headless: true,
      },
    },
  ],
};

export default config;
