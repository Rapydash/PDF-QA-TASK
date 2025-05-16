import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  /* Оцей блок краще розбити на 4 різні методи, які потім збируться в один єдиний */

  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
    // await this.page.waitForURL('**/inventory.html');
    // await this.page.waitForLoadState('domcontentloaded');
    // тут варто було б додати перевірку, що ми дійсно залогінились
    // https://playwright.dev/docs/navigations#waiting-for-navigation
    // await this.page.waitForURL(урла)
  }

  async assertLoginError() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }
}
