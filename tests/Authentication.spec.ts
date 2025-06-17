import { test } from '@playwright/test';
import { logStorage } from './utils/StorageLogger';
import { loginshort } from './utils/LoginShort';
import { loginAndCheckError, loginAndCheckSuccess } from './utils/TestFunctions';

test.describe.configure({ mode: 'parallel' });

test('Login fails with invalid password', async ({ page }) => {
  await loginAndCheckError(page, loginshort, 'standard_user', 'invalid_password');
  await logStorage(page);
});

test('Login succeeds with standard_user', async ({ page }) => {
  await loginAndCheckSuccess(page, loginshort, 'standard_user', 'secret_sauce');
  await logStorage(page);
});

test('Login fails with locked_out_user', async ({ page }) => {
  await loginAndCheckError(page, loginshort, 'locked_out_user', 'secret_sauce');
  await logStorage(page);
});
