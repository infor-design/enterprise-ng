import { ChangeDetectorRef, Component, AfterViewInit, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SohoDropDownComponent, SohoBusyIndicatorDirective } from '../../soho';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'soho-dropdown-demo',
  templateUrl: 'dropdown-async-busy.demo.html',
})
export class DropdownAsyncBusyDemoComponent implements AfterViewInit, OnInit {
  @ViewChildren(SohoDropDownComponent) dropDownComponents: QueryList<SohoDropDownComponent>;
  @ViewChildren(SohoBusyIndicatorDirective) busyIndicators: QueryList<SohoBusyIndicatorDirective>;

  private showModel: boolean = true;
  private form: FormGroup;
  private context = this; // tslint:disable-line
  private itemsAvailable = false;
  private states = [
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OR', label: 'Oregon' },
      { value: 'WA', label: 'Washington' },
      { value: 'WY', label: 'Wyoming' }
    ];
  private model = { value: 'MN' };
  private model2 = { value: 'MN', label: 'Minnesota' };

  private childrenPreload: Subject<any> = new Subject<any>();
  private childrenOnClick: Subject<any> = new Subject<any>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    let group: {[key: string]: any} = [];
    group['testControl'] = new FormControl(this.model.value, null);
    group['testControl2'] = new FormControl(this.model2.value, null);
    this.form = new FormGroup(group);
  }

  ngAfterViewInit() {
    // Initialize options for onLoad dropdown
    let dropdown = this.dropDownComponents.toArray()[0];
    let busyIndicator = this.busyIndicators.toArray()[0];
    this.bindDropdown(this.childrenPreload, dropdown, busyIndicator);

    // Initialize options for onClick dropdown
    let optionsForEventDrivenControl = [];
    optionsForEventDrivenControl.push(this.model2);
    this.childrenOnClick.next(optionsForEventDrivenControl);
    let dropdown2 = this.dropDownComponents.toArray()[1];
    this.changeDetectorRef.detectChanges();
    dropdown2.updated();
  }

  onMouseClick(callback) {
    if (!this.itemsAvailable) {
      let dropdown = this.dropDownComponents.toArray()[1];
      let busyIndicator = this.busyIndicators.toArray()[1];
      this.itemsAvailable = true;
      this.bindDropdown(this.childrenOnClick, dropdown, busyIndicator, callback);
    } else if (callback) {
      callback();
    }
  }

  private bindDropdown(subject, dropdown, busyIndicator, callback?) {
    busyIndicator.activated = true;
    // Retrieve data from rest service and apply to observer
    // setTimeout simulates the behaviour of a rest service
    setTimeout(() => {
      subject.next(this.states);
      this.changeDetectorRef.detectChanges();
      dropdown.updated();
      busyIndicator.activated = false;
      if (callback) {
        callback();
      }
    }, 2000);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }
}
