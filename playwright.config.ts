import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  testDir: "./tests/e2e",
  webServer: {
    command: 'node --experimental-json-modules node_modules/next/dist/bin/next dev',
    url: 'http://localhost:3000',
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
