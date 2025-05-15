import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { logStorage } from "./utils/storageLogger";

test.describe.configure({ mode: "parallel" });

test("Complete purchase flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");

  await inventoryPage.addItem("sauce-labs-backpack");
  await inventoryPage.addItem("sauce-labs-bike-light");
  await inventoryPage.addItem("sauce-labs-bolt-t-shirt");
  await inventoryPage.addItem("sauce-labs-fleece-jacket");
  await inventoryPage.addItem("sauce-labs-onesie");
  await inventoryPage.addItem("test.allthethings()-t-shirt-(red)");

  await inventoryPage.assertCartBadge(6);
  await inventoryPage.removeItem("sauce-labs-onesie");
  await inventoryPage.assertCartBadge(5);

  await inventoryPage.openCart();
  await cartPage.removeItem("sauce-labs-bike-light");
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation("Maksym", "Troian", "79007");
  await checkoutPage.finishCheckout();
  await checkoutPage.assertOrderConfirmation();

  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  await logStorage(page);
});
