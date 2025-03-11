import percySnapshot from '@percy/playwright';
import { expect } from '@playwright/test';
import { test } from '../base-fixture';

test.describe('File Upload Advanced tests', () => {
  const url = '/ids-enterprise-ng-demo/fileupload-advanced';

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test.describe('general page checks', () => {
    test('should have the correct title', async ({ page }) => {
      await expect(page).toHaveTitle('IDS Enterprise - Angular Components');
    });
  });

  test.describe('snapshot tests', () => {
    test('should match the visual snapshot in percy', async ({ page, browserName }) => {
      if (browserName === 'chromium') return;
      await percySnapshot(page, 'soho-fileupload-advanced-light');
    });
  });

  test.describe('functionality tests', () => {
    test('can set the setFailed api', async ({ page }) => {
      const input = page.locator('.hyperlink').first();
      const setFailedButton = page.locator('#set-failed');
      const container = page.locator('.drop-area + .container');
      const errorMessage = page.locator('.error .msg p');

      // Verify the file input is ready
      await expect(input).toBeVisible();

      // Upload a file
      await input.setInputFiles('./docs/CHANGELOG.md');


      await expect(container).toBeVisible();
      await expect(container).toHaveClass(/container/);

      // Trigger failuer scenario
      await expect(setFailedButton).toBeVisible();
      await setFailedButton.click();

      //Confirm error message appears
      await expect(errorMessage).toHaveText('Failed message using setFailed()');
    });
  });
});
