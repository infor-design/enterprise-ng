import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Subject } from 'rxjs';

import { SohoDropDownComponent } from 'ids-enterprise-ng';

import { MOCK_STATES } from './dropdown-mock.data';

@Component({
  selector: 'soho-dropdown-simple-demo',
  templateUrl: './dropdown-async.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownAsyncDemoComponent implements AfterViewInit {
  /** Reference to the dropdown component so we can interact with it programmatically. */
  @ViewChild(SohoDropDownComponent) dropdown: SohoDropDownComponent;

  /** List of observable options {value: string, label: string} */
  @Input() options = new Subject<Array<any>>();

  /** Selected option.  */
  public model = { selectedOption: 'ND' };

  /** Demo flag */
  public showModel = false;

  constructor() { }

  ngAfterViewInit() {
    /**
     * When the component's view has been initialised, which means the children
     * are ready, call the initialise method async which emulates making an ajax call to
     * load data from a backend webapi.
     */
     setTimeout(() => { this.webApiResponse(); });
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  /**
   * ISSUE: I can not work out how to avoid the manual call to updated,
   * I would like the fact the options have been updated to force the \
   * jQuery control to reflect the changes.  The simple and async demos
   * both have the same issue.
   *
   * Ideas?
   */

  webApiResponse() {
    // Push the data out ...
    this.options.next(MOCK_STATES);

    // // When the data has been loaded we need to make sure the dropdown
    // // reflects the changes, we can't just call update now as the view
    // // has not been updated yet, so push it onto the event queue.
    // setTimeout(() => {
    //   // Force the control to refresh - reloading the options.
    //   this.dropdown.updated();
    // });
  }
}
