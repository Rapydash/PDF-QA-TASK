import { test, expect } from '@playwright/test';
import { saveStorageState } from './utils/TestFunctions';

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
