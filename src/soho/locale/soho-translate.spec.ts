import { SohoTranslatePipe } from './soho-translate.pipe';

describe('Pipe: Default', () => {
  let pipe: SohoTranslatePipe;

  beforeEach(() => {
    pipe = new SohoTranslatePipe();
  });

  it('providing no value returns fallback', () => {
    expect(pipe.transform('Ok')).toBe('Ok');
  });
});
