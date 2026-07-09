# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> SauceDemo login automation >> TC02 - locked_out_user
- Location: tests\login.spec.ts:21:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "This message will intentionally fail"
Received string:    "Epic sadface: Sorry, this user has been locked out."
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]: locked_out_user
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]: secret_sauce
        - img [ref=e16]
      - 'heading "Epic sadface: Sorry, this user has been locked out." [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Sorry, this user has been locked out."
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import fs from 'fs';
  3  | import path from 'path';
  4  | import { LoginPage } from '../pages/LoginPage';
  5  | import { ProductsPage } from '../pages/ProductsPage';
  6  | import { ScreenshotManager } from '../utils/ScreenshotManager';
  7  | 
  8  | interface LoginCase {
  9  |   testCaseId: string;
  10 |   username: string;
  11 |   password: string;
  12 |   expected: string;
  13 | }
  14 | 
  15 | const loginDataPath = path.resolve(__dirname, '..', 'test-data', 'loginData.json');
  16 | const loginData: LoginCase[] = JSON.parse(fs.readFileSync(loginDataPath, 'utf8'));
  17 | const screenshotManager = new ScreenshotManager();
  18 | 
  19 | test.describe('SauceDemo login automation', () => {
  20 |   for (const testCase of loginData) {
  21 |     test(`${testCase.testCaseId} - ${testCase.username}`, async ({ page }) => {
  22 |       const loginPage = new LoginPage(page);
  23 |       const productsPage = new ProductsPage(page);
  24 |       const folderPath = screenshotManager.getScenarioFolder(testCase.testCaseId, testCase.username);
  25 | 
  26 |       await loginPage.open();
  27 |       await screenshotManager.capture(page, folderPath, 'LoginPage.png', 'Login Page');
  28 | 
  29 |       await loginPage.login(testCase.username, testCase.password);
  30 |       await screenshotManager.capture(page, folderPath, 'Credentials.png', 'Credentials');
  31 | 
  32 |       if (testCase.expected === 'Pass') {
  33 |         await expect(page.locator('.inventory_list')).toBeVisible();
  34 |         await screenshotManager.capture(page, folderPath, 'ProductsPage.png', 'Products Page');
  35 | 
  36 |         await productsPage.verifyProductsPage();
  37 |         await productsPage.verifyInventory();
  38 |         await productsPage.logout();
  39 |         await screenshotManager.capture(page, folderPath, 'Logout.png', 'Logout');
  40 | 
  41 |         await productsPage.verifyUserReturnedToLoginPage();
  42 |       } else {
  43 |         const errorMessage = await loginPage.getErrorMessage();
  44 |         await screenshotManager.capture(page, folderPath, 'LoginFailed.png', 'Login Failed');
> 45 |         expect(errorMessage).toContain('This message will intentionally fail');
     |                              ^ Error: expect(received).toContain(expected) // indexOf
  46 |       }
  47 |     });
  48 |   }
  49 | });
  50 | 
```