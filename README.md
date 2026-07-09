# E2E Testing with AI

A minimal Playwright TypeScript automation framework for the SauceDemo login flow.

## Technology Stack
- Playwright
- TypeScript
- Playwright Test
- Page Object Model
- JSON test data
- Allure reporting
- Chromium

## Project Structure
- pages/LoginPage.ts
- pages/ProductsPage.ts
- tests/login.spec.ts
- utils/ScreenshotManager.ts
- test-data/loginData.json
- screenshots/
- allure-results/
- allure-report/

## Installation
```bash
npm install
npx playwright install chromium
```

## Execute Tests
```bash
npm test
```

## Generate and Open Allure Report
```bash
npm run allure:open
```

## Update Test Data
Edit the JSON file in [test-data/loginData.json](test-data/loginData.json) to add or change login scenarios.

## Screenshots
Screenshots are stored under the [screenshots](screenshots) folder, with one subfolder per test case.
