import { test, expect } from "@playwright/test";

test.describe("Stats Component", () => {
  test("displays all the expected statistics", async ({ page }) => {
    await page.goto("/");
    await page.fill(".input-search", "squirtle");
    await page.click(".search-button");

    await page.waitForSelector(".stats");

    const statIds = [
      "#hp-text",
      "#attack-text",
      "#defense-text",
      "#s-attack-text",
      "#s-defense-text",
      "#speed-text",
    ];

    for (const id of statIds) {
      await expect(page.locator(id)).not.toBeEmpty();
    }
  });
});
