import { SohoTranslatePipe } from './soho-translate.pipe';

describe('Pipe: SohoTranslatePipe', () => {
  let pipe: SohoTranslatePipe;

  beforeEach(() => {
    pipe = new SohoTranslatePipe();
  });

  it('returns Ok for Ok', () => {
    expect(pipe.transform('Ok')).toBe('Ok');
  });

  it('providing no value returns [undefined]', () => {
    expect(pipe.transform(undefined)).toBe('[undefined]');
  });

  it('providing missing resourceKey returns [resourceKey]', () => {
    expect(pipe.transform('NotAKnownValue')).toBe('[NotAKnownValue]');
  });
});
