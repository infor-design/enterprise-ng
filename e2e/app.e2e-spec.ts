import { SohoAngularComponentsPage } from './app.po';

describe('soho-angular-components App', function() {
  let page: SohoAngularComponentsPage;

  beforeEach(() => {
    page = new SohoAngularComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
