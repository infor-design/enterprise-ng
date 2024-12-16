import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Subject } from 'rxjs';
// @ts-ignore
import { SohoDropDownComponent } from 'ids-enterprise-ng';

import { MOCK_STATES } from './dropdown-mock-with-long-data';

@Component({
    selector: 'app-dropdown-with-width-and-maxwidth',
    templateUrl: 'dropdown-with-width-and-maxwidth.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DropdownWithWidthAndMaxWidthComponent implements AfterViewInit {
  /** Reference to the dropdown component so we can interact with it programmatically. */
  @ViewChild(SohoDropDownComponent, { static: true }) dropdown?: SohoDropDownComponent;

  /** List of observable options {value: string, label: string} */
  @Input() options = new Subject<Array<any>>();

  /** Selected option.  */
  public model = { selectedOption: 'ND' };

  /** Demo flag */
  public showModel = false;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.webApiResponse();
    });
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  webApiResponse() {
    this.options.next(MOCK_STATES);
  }
}
