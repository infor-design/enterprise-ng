import { AppPage } from './app.po';
import { by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display root route header text', async() => {
    await page.navigateTo();
    console.log('got here 1');

    expect(await page.getHeaderText()).toContain('IDS Enterprise Angular Components');
    console.log('got here 2');

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
