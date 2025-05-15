import { Page, expect } from "@playwright/test";

export class InventoryPage {
  constructor(private page: Page) {}

  async addItem(itemName: string) {
    await this.page.click(`[data-test="add-to-cart-${itemName}"]`);
  }

  async removeItem(itemName: string) {
    await this.page.click(`[data-test="remove-${itemName}"]`);
  }

  async openCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }

  async sortItems(option: "az" | "za" | "lohi" | "hilo") {
    await this.page.selectOption(
      '[data-test="product-sort-container"]',
      option
    );
  }

  async assertCartBadge(count: number) {
    await expect(
      this.page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText(String(count));
  }
}
