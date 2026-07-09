import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ScreenshotManager } from '../utils/ScreenshotManager';

interface LoginCase {
  testCaseId: string;
  username: string;
  password: string;
  expected: string;
}

const loginDataPath = path.resolve(__dirname, '..', 'test-data', 'loginData.json');
const loginData: LoginCase[] = JSON.parse(fs.readFileSync(loginDataPath, 'utf8'));
const screenshotManager = new ScreenshotManager();

test.describe('SauceDemo login automation', () => {
  for (const testCase of loginData) {
    test(`${testCase.testCaseId} - ${testCase.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const folderPath = screenshotManager.getScenarioFolder(testCase.testCaseId, testCase.username);

      await loginPage.open();
      await screenshotManager.capture(page, folderPath, 'LoginPage.png', 'Login Page');

      await loginPage.login(testCase.username, testCase.password);
      await screenshotManager.capture(page, folderPath, 'Credentials.png', 'Credentials');

      if (testCase.expected === 'Pass') {
        await expect(page.locator('.inventory_list')).toBeVisible();
        await screenshotManager.capture(page, folderPath, 'ProductsPage.png', 'Products Page');

        await productsPage.verifyProductsPage();
        await productsPage.verifyInventory();
        await productsPage.logout();
        await screenshotManager.capture(page, folderPath, 'Logout.png', 'Logout');

        await productsPage.verifyUserReturnedToLoginPage();
      } else {
        const errorMessage = await loginPage.getErrorMessage();
        await screenshotManager.capture(page, folderPath, 'LoginFailed.png', 'Login Failed');
        expect(errorMessage).toContain('This message will intentionally fail');
      }
    });
  }
});
