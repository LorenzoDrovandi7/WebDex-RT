import { defineConfig, devices } from "@playwright/test";

declare const process: { env: { CI?: string } };

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});
