import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }

  async assertOrderConfirmation() {
    await expect(
      this.page.locator('[data-test="complete-text"]')
    ).toContainText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  }
}
