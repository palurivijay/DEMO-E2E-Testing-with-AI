import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  private readonly pageTitle = 'span.title';
  private readonly inventoryList = '.inventory_list';
  private readonly burgerMenu = '#react-burger-menu-btn';
  private readonly logoutLink = '#logout_sidebar_link';
  private readonly loginLogo = '.login_logo';

  async verifyProductsPage() {
    await expect(this.page.locator(this.pageTitle)).toHaveText('Products');
  }

  async verifyInventory() {
    await expect(this.page.locator(this.inventoryList)).toBeVisible();
  }

  async logout() {
    await this.page.locator(this.burgerMenu).click();
    await this.page.locator(this.logoutLink).click();
  }

  async verifyUserReturnedToLoginPage() {
    await expect(this.page.locator(this.loginLogo)).toBeVisible();
  }
}
