import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { getItemNames, getItemPrices } from './utils/TestFunctions';

test.describe('Inventory Sorting', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForSelector('[data-test="inventory-container"]');
  });

  test('Sorting items A-Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortItems('az');
    const itemNames = await getItemNames(page);
    expect(itemNames).toEqual([...itemNames].sort());
  });

  test('Sorting items Z-A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortItems('za');
    const itemNames = await getItemNames(page);
    expect(itemNames).toEqual([...itemNames].sort().reverse());
  });

  test('Sorting items by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortItems('lohi');
    const itemPrices = await getItemPrices(page);
    expect(itemPrices).toEqual([...itemPrices].sort((a, b) => a - b));
  });

  test('Sorting items by price high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortItems('hilo');
    const itemPrices = await getItemPrices(page);
    expect(itemPrices).toEqual([...itemPrices].sort((a, b) => b - a));
  });
});
