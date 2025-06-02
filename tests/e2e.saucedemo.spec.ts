import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { logStorage } from './utils/StorageLogger';
import { clearStorage } from './utils/StorageCleaner';

test.describe.configure({ mode: 'parallel' });

test('Complete purchase flow', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await clearStorage(page);
  await page.waitForTimeout(1000);
  await loginPage.login('standard_user', 'secret_sauce');

  // Обгорнути в цикл

  await inventoryPage.addItem('sauce-labs-backpack');
  await inventoryPage.addItem('sauce-labs-bike-light');
  await inventoryPage.addItem('sauce-labs-bolt-t-shirt');
  await inventoryPage.addItem('sauce-labs-fleece-jacket');
  await inventoryPage.addItem('sauce-labs-onesie');
  await inventoryPage.addItem('test.allthethings()-t-shirt-(red)');

  await inventoryPage.assertCartBadge(6);
  await inventoryPage.removeItem('sauce-labs-onesie');
  await inventoryPage.assertCartBadge(5);

  await inventoryPage.openCart();
  await cartPage.removeItem('sauce-labs-bike-light');
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Maksym', 'Troian', '79007');
  await checkoutPage.finishCheckout();
  await checkoutPage.assertOrderConfirmation();

  // В одному тесті краще не комбінувати між собою логіку з POM та з прямим використанням пейджі
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  await logStorage(page);
});
