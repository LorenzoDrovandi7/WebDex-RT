import { test, expect } from "@playwright/test";

test.describe("Navigation Flow", () => {
  test("It allows you to search for multiple Pokémon in a row without errors.", async ({ page }) => {
    await page.goto("/");

    const searchAndCheck = async (name: string) => {
      await page.fill(".input-search", name);
      await page.click(".search-button");
      await page.waitForSelector(".stats");
      await expect(page.locator(".hp-text")).not.toBeEmpty();
    };

    await searchAndCheck("pikachu");
    await searchAndCheck("snorlax");
    await searchAndCheck("gengar");
  });
});
