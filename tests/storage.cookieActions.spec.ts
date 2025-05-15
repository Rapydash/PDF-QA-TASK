// Збереження стану після логіну

// import { test } from "@playwright/test";

// test("SaveCookie", async ({ page }) => {
//   await page.goto("https://www.saucedemo.com");
//   await page.fill('[data-test="username"]', "standard_user");
//   await page.fill('[data-test="password"]', "secret_sauce");
//   await page.click('[data-test="login-button"]');
//   await page.context().storageState({ path: "storageState.json" });
// });

// Використання збереженого стану в іншому тесті

// import { test, expect } from "@playwright/test";

// test.use({ storageState: "storageState.json" });

// test("UseCookie", async ({ page }) => {
//   await page.goto("https://www.saucedemo.com/inventory.html");
//   await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
// });
