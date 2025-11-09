import { test, expect } from "@playwright/test";

test.describe("Data Component", () => {
  test("It displays the Pokémon information correctly.", async ({ page }) => {
    await page.goto("/");
    await page.fill(".input-search", "charmander");
    await page.click(".search-button");

    await page.waitForSelector(".stats");

    await expect(page.locator("text=Charmander")).toBeVisible();
    await expect(page.locator(".hp-text")).not.toBeEmpty();
    await expect(page.locator(".attack-text")).not.toBeEmpty();
    await expect(page.locator(".defense-text")).not.toBeEmpty();
  });
});
