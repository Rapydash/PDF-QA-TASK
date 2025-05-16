import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  /* Оцей блок краще розбити на 4 різні методи, які потім збируться в один єдиний 

  f.e. 
  async fillFirstName(firstName: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.fill('[data-test="lastName"]', lastName);
  }
    ..........

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
  await this.fillFirstName(firstName);
  await this.fillLastName(lastName);
  await this.fillPostalCode(postalCode);
  }
 
  глянь оцей відос про імперативний та декларативний підходи:
  https://www.youtube.com/watch?v=CG_AFjcc81A&ab_channel=qa%D1%81%D0%B5%D0%BC%D0%BF%D0%B0%D0%B9%7C%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D1%96%D1%8F%D1%82%D0%B5%D1%81%D1%82%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F
  */

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }

  async assertOrderConfirmation() {
    /* тут так само можеш почитати про типи assert-ів, які є в Playwright
		https://www.browserstack.com/guide/playwright-assertions
		і про те, як їх можна комбінувати
		*/

    await expect(this.page.locator('[data-test="complete-text"]')).toContainText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }
}
