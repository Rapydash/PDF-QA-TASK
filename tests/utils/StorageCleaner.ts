// можна викликати await clearStorage(page) в тестах, щоб очистити локальне сховище та кукі, можна також додати в
// beforeEach чи beforeAll, щоб очистити сховище перед кожним тестом або перед всіма у групі.

import { Page } from '@playwright/test';

export async function clearStorage(page: Page) {
  await page.context().clearCookies();

  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}
