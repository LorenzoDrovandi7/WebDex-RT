import { test, expect } from "@playwright/test";

test.describe("SearchBar", () => {
  test("It displays the first 151 Pokémon and allows you to search by name.", async ({ page }) => {
    await page.goto("/");

    await page.waitForSelector(".pokemon-button");

    const buttons = page.locator(".pokemon-button");
    await expect(buttons).toHaveCount(151);

    await page.fill(".input-search", "pikachu");
    await page.click(".search-button");

    await expect(page.locator(".stats")).toBeVisible();
  });

  test("Select a Pokémon by clicking on its button.", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".pokemon-button");
    await page.click("text=bulbasaur");

    await expect(page.locator(".stats")).toBeVisible();
    await expect(page.locator("#hp-text")).not.toBeEmpty();
  });
});
