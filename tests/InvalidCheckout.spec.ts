import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { checkoutWithEmptyInfo } from './utils/TestFunctions';

test('Checkout without filling information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await checkoutWithEmptyInfo(loginPage, inventoryPage, cartPage, page);

  const errorLocator = page.locator('[data-test="error"]');
  await expect(errorLocator).toBeVisible();
  await expect(errorLocator).toHaveText('Error: First Name is required');
});
