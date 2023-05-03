import { Component, AfterViewInit, ViewChild } from '@angular/core';
// @ts-ignore
import { SohoDropDownComponent } from 'ids-enterprise-ng';

import { MOCK_STATES } from './dropdown-mock.data';

@Component({
  selector: 'app-dropdown-simple-demo',
  templateUrl: 'dropdown-simple.demo.html'
})
export class DropdownSimpleDemoComponent implements AfterViewInit {
  @ViewChild(SohoDropDownComponent, { static: true }) dropDownComponent?: SohoDropDownComponent;

  /** Defautl selected item.  */
  model = { selectedOption: 'ND', selectedOptionXss: '<script>window.alert("dropdown xss")</script>XSS' };

  showModel = false;

  /** Used the html to comntrol the options. */
  options: any = [];

  readOnly = true;

  ngAfterViewInit() {
    this.initialise();
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  initialise() {
    // Retrieve data from AJAX service and call resonse.
    // setTimeout simulates the behaviour of a rest service
    setTimeout(() => {
      this.options = MOCK_STATES;
    });
  }

  onUpdated(event: SohoDropDownEvent) {
    console.log(`updated ${event.data}`);
  }

  onChange(event: SohoDropDownEvent) {
    console.log(`updated ${event.data}`);
  }
}
