import { Page } from '@playwright/test';

// export async function getItemNames(page: Page) {
//   return await page.locator('.inventory_item_name').allTextContents(); -> почитай про конструкції .allTextContents() та .all()
// }
export async function getItemNames(page: Page) {
  return await page.$$eval('.inventory_item_name', (items) => items.map((item) => item.textContent || ''));
}

// export async function getItemNames(page: Page) {
//   const pricesRaw = await page.locator('.inventory_item_name').all() -> це просто як приклад використання .all(). Можна простіше через .allTextContents()
//   const prices = pricesRaw.forEach((price) => parseFloat((price.textContent || '').replace('$', '')))
// }
export async function getItemPrices(page: Page) {
  return await page.$$eval('.inventory_item_price', (items) =>
    items.map((item) => parseFloat((item.textContent || '').replace('$', '')))
  );
}

export async function addItemsToCart(inventoryPage: any, items: string[]) {
  for (let item of items) {
    await inventoryPage.addItem(item);
  }
}

export async function removeItemsFromCart(cartPage: any, items: string[]) {
  for (let item of items) {
    await cartPage.removeItem(item);
  }
}

export async function loginAndCheckSuccess(page: Page, loginshort: Function, username: string, password: string) {
  await loginshort(page, username, password);
  await page.waitForSelector('[data-test="inventory-container"]');
}

export async function loginAndCheckError(page: Page, loginshort: Function, username: string, password: string) {
  await loginshort(page, username, password);
  await page.waitForSelector('[data-test="error"]');
}

export async function checkRedirectToLogin(page: Page, url: string) {
  await page.goto(url);
  await page.waitForSelector('.login_logo');
  await page.waitForSelector('[data-test="login-container"]');
  const path = url.split('/').pop();
  const message = `Epic sadface: You can only access '/${path}' when you are logged in.`;
  await page.waitForSelector('div.error-message-container');
  await page.waitForSelector('form');
  return message;
}

export async function checkoutWithEmptyInfo(loginPage: any, inventoryPage: any, cartPage: any, page: Page) {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItem('sauce-labs-backpack');
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();
  await page.click('[data-test="continue"]');
}

export async function saveStorageState(page: Page, username: string, password: string, storagePath: string) {
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: storagePath });
}
