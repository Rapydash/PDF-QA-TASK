export async function loginshort(page, username: string, password: string) {
  await page.goto("/");
  await page.locator('[data-test="username"]').fill(username);
  await page.waitForTimeout(300);
  await page.locator('[data-test="password"]').fill(password);
  await page.waitForTimeout(300);
  await page.locator('[data-test="login-button"]').click();
}
