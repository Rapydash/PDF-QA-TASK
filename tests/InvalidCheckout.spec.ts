import { expect, test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { logStorage } from "./utils/storageLogger";

test("Checkout without filling information", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");

  await inventoryPage.addItem("sauce-labs-backpack");
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await page.click('[data-test="continue"]');

  await page
    .locator('[data-test="checkout-info-container"] div')
    .filter({ hasText: "Error: First Name is required" })
    .nth(2)
    .click();
  await expect(page.locator("form")).toContainText(
    "Error: First Name is required"
  );
});
