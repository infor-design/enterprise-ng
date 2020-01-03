import { TestBed } from '@angular/core/testing';

import { SohoVersionInitializerService } from './version-initializer.service';

describe('Soho Version Initialiser Service', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
    ],
    providers: [
    ]
  }));

  it('should be created', () => {
    const service: SohoVersionInitializerService = TestBed.inject(SohoVersionInitializerService);
    expect(service).toBeTruthy();
  });
});
