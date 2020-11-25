import { SohoTranslatePipe } from './soho-translate.pipe';

describe('Pipe: SohoTranslatePipe', () => {
  let pipe: SohoTranslatePipe;

  beforeEach(() => {
    pipe = new SohoTranslatePipe();
  });

  it('returns OK for Ok', (done) => {
    Soho.Locale.set('en-US').done(
      () => {
        expect(pipe.transform('Ok')).toBe('Ok');
        done();
      });
  });

  it('providing no value returns []', () => {
    expect(pipe.transform('')).toEqual('[]');
  });

  it('providing missing resourceKey returns [resourceKey]', () => {
    expect(pipe.transform('NotAKnownValue')).toBe('[NotAKnownValue]');
  });

  it('be possible to extend a language', done => {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('it-IT').done(() => {
      const lang = Soho.Locale.currentLanguage.name;
      const newStrings = {
        Thanks: { id: 'Thanks', value: 'Grazie', comment: '' },
        YourWelcome: { id: 'YourWelcome', value: 'Prego', comment: '' }
      };

      if (Soho.Locale.languages[lang].messages !== undefined) {
        Soho.Locale.extendTranslations(lang, newStrings);
      }

      expect(pipe.transform('Thanks')).toBe('Grazie');
      done();
    });
  });
});
