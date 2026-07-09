import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private readonly usernameInput = 'input[data-test="username"]';
  private readonly passwordInput = 'input[data-test="password"]';
  private readonly loginButton = 'input[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly loginLogo = '.login_logo';

  async open() {
    await this.page.goto('/');
    await this.verifyLoginPage();
  }

  async verifyLoginPage() {
    await expect(this.page.locator(this.loginLogo)).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async getErrorMessage() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    return this.page.locator(this.errorMessage).textContent();
  }
}
