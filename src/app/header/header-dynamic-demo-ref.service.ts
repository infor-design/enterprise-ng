import { Injectable } from '@angular/core';
import { SohoHeaderDynamicDemoComponent } from './header-dynamic.demo';

/**
 * Special service used by a "root router-outlet component": i.e. ListComponent, FormComponent. etc...
 * to set the banner headers toolbar options and state.
 */
@Injectable()
export class HeaderDynamicDemoRefService {
  private sohoHeaderComponent: SohoHeaderDynamicDemoComponent;

  public set instance(sohoHeaderComponent: SohoHeaderDynamicDemoComponent) {
    this.sohoHeaderComponent = sohoHeaderComponent;
  }

  public get instance(): SohoHeaderDynamicDemoComponent {
    return this.sohoHeaderComponent;
  }
}
