import {
  Component,
  AfterViewInit,
  ViewChild
} from '@angular/core';

import { SohoDropDownComponent } from 'ids-enterprise-ng';

import { MOCK_STATES } from './dropdown-mock.data';

@Component({
  selector: 'soho-dropdown-simple-demo',
  templateUrl: './dropdown-simple.demo.html',
})
export class DropdownSimpleDemoComponent implements AfterViewInit {
   @ViewChild(SohoDropDownComponent) dropDownComponent: SohoDropDownComponent;

  /** Defautl selected item.  */
  model = { selectedOption: 'ND' };

  showModel = false;

  /** Used the html to comntrol the options. */
  options = [];

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
}
