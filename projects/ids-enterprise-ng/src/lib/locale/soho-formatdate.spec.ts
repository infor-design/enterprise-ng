/// <reference path="soho-locale.d.ts" />

import { SohoFormatDatePipe } from './soho-formatdate.pipe';

fdescribe('Pipe: Default', () => {
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

  it('Should format dates in a different locale', (done) => {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US');
    Soho.Locale.getLocale('nl-NL').done(
      () => {
        // Note date is year, month, day
        expect(Soho.Locale.currentLocale.name).toEqual('en-US');
        expect(Soho.Locale.currentLocale.name).toEqual('en-US');
        expect(pipe.transform(new Date(2000, 10, 8))).toEqual('11/8/2000');
        expect(pipe.transform(new Date(2000, 10, 8), { date: 'short', locale: 'nl-NL' })).toEqual('08-11-2000');
        done();
      });
  });

  it('Should format dates with timezones', (done) => {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US');
    expect(['3/22/2018 8:11 PM Eastern Standard Time', '3/22/2018 8:11 PM Eastern Daylight Time'])
      .toContain(Soho.Locale.formatDate(new Date(2018, 2, 22, 20, 11, 12), { date: 'timezoneLong' }));
    expect(['22-03-2000 20:11 Eastern Standard Time', '22-03-2000 20:11 Eastern Daylight Time'])
      .toContain(Soho.Locale.formatDate(new Date(2000, 2, 22, 20, 11, 12), { pattern: 'dd-MM-yyyy HH:mm zzzz' }));

    Soho.Locale.set('nl-NL').done(
      () => {
        expect(['22/3/2018 20:11 Eastern-standaardtijd', '22/3/2018 20:11 Eastern-zomertijd'])
          .toContain(Soho.Locale.formatDate(new Date(2018, 2, 22, 20, 11, 12), { date: 'timezoneLong' }));
        expect(['22-03-2000 20:11 Eastern-standaardtijd', '22-03-2000 20:11 Eastern-zomertijd'])
          .toContain(Soho.Locale.formatDate(new Date(2000, 2, 22, 20, 11, 12), { pattern: 'dd-MM-yyyy HH:mm zzzz' }));

        done();
      });
  });
});
