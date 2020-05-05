/// <reference path="soho-locale.d.ts" />
describe('Soho Locale Types Tests', () => {

  it('Validate Types and Translations', (done) => {
    Soho.Locale.set('en-US').done(() => {
      expect(Soho.Locale.currentLanguage.messages['AddComments'].value).toEqual('Add Comments');
      expect(Soho.Locale.currentLanguage.messages['AddComments'].comment).toEqual('Add comments to a form of data');
      expect(Soho.Locale.currentLanguage.messages['AddComments'].id).toEqual('AddComments');
      done();
    });
  });

  it('Add a new message (not the best way)', (done) => {
    Soho.Locale.set('en-US').done(() => {
      Soho.Locale.currentLanguage.messages['Test'] = {
        id: 'Test',
        value: 'Test'
      };
      expect(Soho.Locale.currentLanguage.messages['Test'].id).toEqual('Test');
      expect(Soho.Locale.currentLanguage.messages['Test'].value).toEqual('Test');
      done();
    });
  });

  it('Have Types for currentLocale.data', (done) => {
    Soho.Locale.set('en-US').done(() => {
      expect(Soho.Locale.currentLocale.name).toEqual('en-US');
      expect(Soho.Locale.currentLocale.data.name).toEqual('en-US');
      expect(Soho.Locale.currentLocale.data.englishName).toEqual('English (United States)');
      done();
    });
  });
});
