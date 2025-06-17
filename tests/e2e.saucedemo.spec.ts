import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { logStorage } from './utils/StorageLogger';
import { clearStorage } from './utils/StorageCleaner';
import { addItemsToCart, removeItemsFromCart } from './utils/TestFunctions';

test('Complete purchase flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await clearStorage(page);
  await loginPage.login('standard_user', 'secret_sauce');

  const itemsToAdd = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket',
    'sauce-labs-onesie',
    'test.allthethings()-t-shirt-(red)',
  ];
  await addItemsToCart(inventoryPage, itemsToAdd);

  await inventoryPage.assertCartBadge(6);
  await inventoryPage.removeItem('sauce-labs-onesie');
  await inventoryPage.assertCartBadge(5);

  await inventoryPage.openCart();
  await removeItemsFromCart(cartPage, ['sauce-labs-bike-light']);
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Maksym', 'Troian', '79007');
  await checkoutPage.finishCheckout();
  await checkoutPage.assertOrderConfirmation();

  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  await logStorage(page);
});
