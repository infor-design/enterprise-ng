import { SohoVersionInitializerModule } from './version-initializer.module';

describe('SunSystemsAuthModule', () => {
  let module: SohoVersionInitializerModule;

  beforeEach(() => {
    module = new SohoVersionInitializerModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
