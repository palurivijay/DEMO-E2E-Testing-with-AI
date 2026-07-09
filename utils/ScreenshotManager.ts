import fs from 'fs';
import path from 'path';
import { Page, test } from '@playwright/test';

export class ScreenshotManager {
  private readonly baseFolder: string;

  constructor(baseDir: string = 'screenshots') {
    this.baseFolder = path.resolve(__dirname, '..', baseDir);
    if (!fs.existsSync(this.baseFolder)) {
      fs.mkdirSync(this.baseFolder, { recursive: true });
    }
  }

  getScenarioFolder(testCaseId: string, username: string) {
    const cleanUsername = username.replace(/[^a-zA-Z0-9]/g, '_');
    const folderName = `${testCaseId}_${cleanUsername}`;
    const folderPath = path.join(this.baseFolder, folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    return folderPath;
  }

  async capture(page: Page, folderPath: string, fileName: string, attachmentName: string) {
    const fullPath = path.join(folderPath, fileName);
    await page.screenshot({ path: fullPath, fullPage: true });
    await test.info().attach(attachmentName, { path: fullPath, contentType: 'image/png' });
  }
}
