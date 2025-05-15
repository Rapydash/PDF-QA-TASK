import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";

test.describe("Inventory Sorting", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await page.waitForSelector('[data-test="inventory-container"]');
  });

  test("Sorting items A-Z", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortItems("az");
    const itemNames = await page.$$eval(".inventory_item_name", (items) =>
      items.map((item) => item.textContent)
    );
    const sortedNames = [...itemNames].sort();
    expect(itemNames).toEqual(sortedNames);
  });

  test("Sorting items Z-A", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortItems("za");
    const itemNames = await page.$$eval(".inventory_item_name", (items) =>
      items.map((item) => item.textContent)
    );
    const sortedNames = [...itemNames].sort().reverse();
    expect(itemNames).toEqual(sortedNames);
  });

  test("Sorting items by price low to high", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortItems("lohi");
    const itemPrices = await page.$$eval(".inventory_item_price", (items) =>
      items.map((item) => parseFloat((item.textContent ?? "").replace("$", "")))
    );
    const sortedPrices = [...itemPrices].sort((a, b) => a - b);
    expect(itemPrices).toEqual(sortedPrices);
  });

  test("Sorting items by price high to low", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortItems("hilo");
    const itemPrices = await page.$$eval(".inventory_item_price", (items) =>
      items.map((item) => parseFloat((item.textContent ?? "").replace("$", "")))
    );
    const sortedPrices = [...itemPrices].sort((a, b) => b - a);
    expect(itemPrices).toEqual(sortedPrices);
  });
});
