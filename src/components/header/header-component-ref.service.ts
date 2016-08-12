import { Injectable } from '@angular/core';
import { SohoHeaderComponent } from './header.component';

/**
 * Special service used by a "root router-outlet component": i.e. ListComponent, FormComponent. etc...
 * to set the banner headers toolbar options and state.
 */
@Injectable()
export class SohoHeaderComponentRefService {
  private sohoHeaderComponent: SohoHeaderComponent;

  public set instance(sohoHeaderComponent: SohoHeaderComponent) {
    this.sohoHeaderComponent = sohoHeaderComponent;
  }

  public get instance(): SohoHeaderComponent {
    return this.sohoHeaderComponent;
  }
}
