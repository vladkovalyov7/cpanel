import { defineConfig } from "@playwright/test";
import { Config } from "./utils/Config";

const config = Config.getInstance();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 60000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: config.baseUrl,
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on",
    viewport: { width: 1280, height: 720 },
  },
  reporter: [["allure-playwright"], ["list"]],
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
  ],
});
