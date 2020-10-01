import { SohoFormatNumberPipe } from './soho-formatnumber.pipe';

describe('Pipe: Default', () => {
  let pipe: SohoFormatNumberPipe;

  beforeEach(() => {
    pipe = new SohoFormatNumberPipe();
  });

  it('Should format en-US numbers', (done) => {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US').done(
      () => {
        expect(pipe.transform(1)).toEqual('1.00');
        expect(pipe.transform(2)).toEqual('2.00');
        done();
      });
  });

  it('Should format numbers in a different locale', (done) => {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US');
    Soho.Locale.getLocale('hi-IN').done(
      () => {
        expect(Soho.Locale.currentLocale.name).toEqual('en-US');
        expect(pipe.transform(450000, { locale: 'hi-IN' })).toEqual('4,50,000.00');
        expect(pipe.transform(45000, { locale: 'hi-IN' })).toEqual('45,000.00');
        done();
      });
  });

  it('Should be able to see number data', (done) => {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US').done(() => {
      expect(Soho.Locale.calendar().firstDayofWeek).toEqual(0);
    });

    Soho.Locale.set('sv-SE').done(() => {
      expect(Soho.Locale.calendar().firstDayofWeek).toEqual(1);
      done();
    });
  });
});
