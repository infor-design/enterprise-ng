import { SohoVersionInitializerModule } from './version-initializer.module';

describe('Soho Version Initializer Module', () => {
  let module: SohoVersionInitializerModule;

  beforeEach(() => {
    module = new SohoVersionInitializerModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
