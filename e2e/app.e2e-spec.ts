import { SohoxiAngularPage } from './app.po';

describe('sohoxi-angular App', function() {
  let page: SohoxiAngularPage;

  beforeEach(() => {
    page = new SohoxiAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
