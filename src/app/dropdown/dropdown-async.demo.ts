import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChange
} from '@angular/core';

import { Subject } from 'rxjs/Rx';

import {
  SohoDropDownComponent,
  SohoBusyIndicatorDirective
} from '../../soho';

@Component({
  selector: 'soho-dropdown-simple-demo',
  templateUrl: 'dropdown-async.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownAsyncDemoComponent implements AfterViewInit, OnChanges {
  /** Reference to the dropdown component so we can interact with it programmatically. */
  @ViewChild(SohoDropDownComponent) dropdown: SohoDropDownComponent;

  /** Reference to the busy indicator so we can interact with it. */
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  /** List of observable options {value: string, label: string} */
  @Input() options = new Subject<Array<any>>();

  /** Selected option.  */
  model = { selectedOption: 'ND' };

  /** Demo flag */
  showModel = false;

  constructor() { }

  ngAfterViewInit() {
    /**
     * When the component's view has been initialised, which means the children
     * are ready, call the initialise method async which emulates making an ajax call to
     * load data from a backend webapi.
     * */
     setTimeout(() => { this.loadFromWebApi(); });
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    console.log(changes);
    // this.dropdown.enable();
    // this.busyIndicator.activated = false;
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  loadFromWebApi() {
    // Display the status indicator.
    this.busyIndicator.activated = true;

    // Retrieve data from AJAX service and call resonse.
    // setTimeout simulates the behaviour of a rest service
    this.options.next([
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OR', label: 'Oregon' },
      { value: 'WA', label: 'Washington' },
      { value: 'WY', label: 'Wyoming' }
    ]);

    // Wheb the data base been loaded we need to make sure the dropdown re-reads
    // the options (it does not automatically).
    setTimeout(() => {
      // Force the control to refresh - reloading the options.
      this.dropdown.updated();

      // The dropdown was disabled by default.
      this.dropdown.enable();

      // Complete the busy indicator - we're ready
      this.busyIndicator.activated = false;
    });
  }
}
