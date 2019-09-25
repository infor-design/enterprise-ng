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
    console.log('got here 1');

    expect(page.getHeaderText()).toBe('IDS Enterprise Angular Components');

    // const headerTextElement = element(by.css('app-header-dynamic-demo soho-header soho-toolbar h1 span'));
    // expect(headerTextElement).toBeDefined();
    // expect(headerTextElement.getText()).toContain('IDS Enterprise Angular Components');
    // console.log('got here');

    // expect(element(by.css('soho-icons'))).toBeDefined();
    // expect(element(by.css('soho-toolbar'))).toBeDefined();
    // page.getHeaderText().then(result => console.log('getText result is:', [result]));
    // console.log('header text is:', );
    // expect(page.getHeaderText()).toEqual('IDS Enterprise Angular Components');
  });
});
