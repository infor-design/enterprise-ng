import {
  ChangeDetectorRef,
  Component,
  AfterViewInit,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SohoDropDownComponent,
  SohoBusyIndicatorDirective
} from '../../soho';

@Component({
  selector: 'soho-dropdown-simple-demo',
  templateUrl: 'dropdown-simple.demo.html',
})
export class DropdownSimpleDemoComponent implements OnInit, AfterViewInit {
   @ViewChild(SohoDropDownComponent) dropDownComponent: SohoDropDownComponent;
   @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  /** Defautl selected item.  */
  model = { selectedOption: 'ND' };

  showModel = false;

  /** Used the html to comntrol the options. */
  options = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initialise();
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  initialise() {

    this.busyIndicator.activated = true;

    // Retrieve data from AJAX service and call resonse.
    // setTimeout simulates the behaviour of a rest service
    setTimeout(() => {
      this.options = [
        { value: 'AK', label: 'Alaska'},
        { value: 'AZ', label: 'Arizona'},
        { value: 'CA', label: 'California'},
        { value: 'CO', label: 'Colorado'},
        { value: 'MN', label: 'Minnesota'},
        { value: 'ND', label: 'North Dakota'},
        { value: 'OR', label: 'Oregon'},
        { value: 'WA', label: 'Washington'},
        { value: 'WY', label: 'Wyoming'}
      ];

      this.changeDetectorRef.detectChanges();
      this.dropDownComponent.updated();
      this.busyIndicator.activated = false;
    }, 2000);
  }

}
