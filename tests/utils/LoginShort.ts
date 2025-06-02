import { Page } from '@playwright/test';

// Parameter 'page' implicitly has an 'any' type, but a better type may be inferred from usage.ts(7044)
export async function loginshort(page: Page, username: string, password: string) {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

/* треба уникати waitForTimeout, краще використовувати waitForSelector або інші методи */
