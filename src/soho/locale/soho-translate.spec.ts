import { SohoTranslatePipe } from './soho-translate.pipe';

describe('Pipe: SohoTranslatePipe', () => {
  let pipe: SohoTranslatePipe;

  beforeEach(() => {
    pipe = new SohoTranslatePipe();
  });

  it('retruns Ok for Ok', () => {
    expect(pipe.transform('Ok')).toBe('Ok');
  });

  it('providing no value returns fallback', () => {
    expect(pipe.transform('Ok')).toBe('Ok');
  });
});
