import { SohoFormatNumberPipe } from './soho-formatnumber.pipe';

describe('Pipe: Default', () => {
  let pipe: SohoFormatNumberPipe;

  beforeEach(() => {
    pipe = new SohoFormatNumberPipe();
  });

  it('Should format en-US dates', (done) => {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US').done(
      () => {
        // Note date is year, month, day
        expect(pipe.transform(1)).toEqual('1.00');
        expect(pipe.transform(2)).toEqual('2.00');
        done();
      });
  });
});
