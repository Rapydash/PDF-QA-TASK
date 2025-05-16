import { test, expect } from '@playwright/test';

test('Skip Login Page to inventory', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="login-container"]')).toBeVisible();
  // Подвійна перевірка елемента
  await expect(
    page.locator('div').filter({
      hasText: /^Epic sadface: You can only access '\/inventory\.html' when you are logged in\.$/,
    })
  ).toBeVisible();
  await expect(page.locator('form')).toContainText(
    "Epic sadface: You can only access '/inventory.html' when you are logged in."
  );
});

test('Skip Login Page to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/cart.html');
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="login-container"]')).toBeVisible();
  await expect(
    page.locator('div').filter({
      hasText: /^Epic sadface: You can only access '\/cart\.html' when you are logged in\.$/,
    })
  ).toBeVisible();
  await expect(page.locator('form')).toContainText(
    "Epic sadface: You can only access '/cart.html' when you are logged in."
  );
});

test('Skip Login Page to checkout1', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/checkout-step-one.html');
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="login-container"]')).toBeVisible();
  await expect(
    page.locator('div').filter({
      hasText: /^Epic sadface: You can only access '\/checkout-step-one\.html' when you are logged in\.$/,
    })
  ).toBeVisible();
  await expect(page.locator('form')).toContainText(
    "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in."
  );
});

test('Skip Login Page to checkout2', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/checkout-step-two.html');
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="login-container"]')).toBeVisible();
  await expect(
    page.locator('div').filter({
      hasText: /^Epic sadface: You can only access '\/checkout-step-two\.html' when you are logged in\.$/,
    })
  ).toBeVisible();
  await expect(page.locator('form')).toContainText(
    "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in."
  );
});
