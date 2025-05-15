import { test, expect } from "@playwright/test";
import { logStorage } from "./utils/storageLogger";
import { loginshort } from "./utils/LoginShort";

test.describe.configure({ mode: "parallel" });

test("Login fails with invalid password", async ({ page }) => {
  await loginshort(page, "standard_user", "invalid_password");
  await page.waitForSelector('[data-test="error"]');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await logStorage(page);
});

test("Login succeeds with standard_user", async ({ page }) => {
  await loginshort(page, "standard_user", "secret_sauce");
  await page.waitForSelector('[data-test="inventory-container"]');
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  await logStorage(page);
});

test("Login fails with locked_out_user", async ({ page }) => {
  await loginshort(page, "locked_out_user", "secret_sauce");
  await page.waitForSelector('[data-test="error"]');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await logStorage(page);
});
