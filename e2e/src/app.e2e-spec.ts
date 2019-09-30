import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeAll(async() => {
    page = new AppPage();
    browser.waitForAngularEnabled(false);
  });

  it('should display root route header text', async() => {
    await page.navigateTo();
    expect(page.getHeaderText()).toBe('IDS Enterprise Angular Components');
  });
});
