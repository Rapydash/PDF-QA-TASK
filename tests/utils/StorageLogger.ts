import { Page } from '@playwright/test';

export async function logStorage(page: Page) {
  const localStorageData = await page.evaluate(() => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) data[key] = localStorage.getItem(key) || '';
    }
    return data;
  });

  const sessionStorageData = await page.evaluate(() => {
    const data: Record<string, string> = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) data[key] = sessionStorage.getItem(key) || '';
    }
    return data;
  });

  const cookies = await page.context().cookies();

  console.log('📦 Local Storage:', localStorageData);
  console.log('📦 Session Storage:', sessionStorageData);
  console.log('🍪 Cookies:', cookies);
  console.log('========================================');
}
