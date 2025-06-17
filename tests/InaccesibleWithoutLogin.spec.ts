import { test, expect } from '@playwright/test';
import { checkRedirectToLogin } from './utils/TestFunctions';

test('Skip Login Page to inventory', async ({ page }) => {
  const message = await checkRedirectToLogin(page, 'https://www.saucedemo.com/inventory.html');
  await expect(page.locator('div.error-message-container')).toHaveText(message);
  await expect(page.locator('form')).toContainText(message);
});

test('Skip Login Page to cart', async ({ page }) => {
  const message = await checkRedirectToLogin(page, 'https://www.saucedemo.com/cart.html');
  await expect(page.locator('div.error-message-container')).toHaveText(message);
  await expect(page.locator('form')).toContainText(message);
});

test('Skip Login Page to checkout1', async ({ page }) => {
  const message = await checkRedirectToLogin(page, 'https://www.saucedemo.com/checkout-step-one.html');
  await expect(page.locator('div.error-message-container')).toHaveText(message);
  await expect(page.locator('form')).toContainText(message);
});

test('Skip Login Page to checkout2', async ({ page }) => {
  const message = await checkRedirectToLogin(page, 'https://www.saucedemo.com/checkout-step-two.html');
  await expect(page.locator('div.error-message-container')).toHaveText(message);
  await expect(page.locator('form')).toContainText(message);
});
