import { test, expect } from '@playwright/test';

async function saveStorageState(page, username, password, storagePath) {
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: storagePath });
}

test('Save storage state after login', async ({ page }) => {
  await saveStorageState(page, 'standard_user', 'secret_sauce', 'storageState.json');
});

test.describe('Using saved storage state', () => {
  test.use({ storageState: 'storageState.json' });

  test('Opens inventory page without login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });
});
