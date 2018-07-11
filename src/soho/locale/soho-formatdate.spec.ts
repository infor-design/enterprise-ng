import { SohoFormatDatePipe } from './soho-formatdate.pipe';

describe('Pipe: Default', () => {
  let pipe: SohoFormatDatePipe;

  beforeEach(() => {
    pipe = new SohoFormatDatePipe();
  });

  it('Should format en-US dates', (done) => {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US').done(
      () => {
        // Note date is year, month, day
        expect(pipe.transform(new Date(2000, 10, 8))).toEqual('11/8/2000');
        expect(pipe.transform(new Date(2000, 10, 8), { date: 'short' })).toEqual('11/8/2000');
        done();
      });
  });
});
