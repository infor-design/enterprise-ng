import { ChangeDetectorRef, Component, AfterViewInit, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SohoDropDownComponent, SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { Subject } from 'rxjs';

@Component({
  selector: 'soho-dropdown-demo',
  templateUrl: './dropdown-async-busy.demo.html',
})
export class DropdownAsyncBusyDemoComponent implements AfterViewInit, OnInit {
  @ViewChildren(SohoDropDownComponent) dropDownComponents: QueryList<SohoDropDownComponent>;
  @ViewChildren(SohoBusyIndicatorDirective) busyIndicators: QueryList<SohoBusyIndicatorDirective>;

  public showModel = true;
  public form: FormGroup;
  public context = this;
  public itemsAvailable = false;
  public states = [
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
  public model = { value: 'MN' };
  public model2 = { value: 'ND', label: 'North Dakota' };

  public childrenPreload: Subject<any> = new Subject<any>();
  public childrenOnClick: Array<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    const group: {[key: string]: any} = [];
    group['testControl'] = new FormControl(this.model.value, null);
    group['testControl2'] = new FormControl(this.model2.value, null);
    this.form = new FormGroup(group);
  }

  ngAfterViewInit() {
    // Initialize options for onLoad dropdown
    const dropdown = this.dropDownComponents.toArray()[0];
    const busyIndicator = this.busyIndicators.toArray()[0];
    this.bindDropdown(this.childrenPreload, dropdown, busyIndicator);

    // Initialize options for onClick dropdown
    const arInit = [];
    arInit.push(this.model2);
    this.childrenOnClick = arInit;
    const dropdown2 = this.dropDownComponents.toArray()[1];
    this.changeDetectorRef.detectChanges();
    dropdown2.updated();
  }

  onSource = (response: SohoDropDownResponseFunction, searchTerm: any) => {
    if (!this.itemsAvailable) {
      this.itemsAvailable = true;
      setTimeout(() => {
        response(this.states, true);
      }, 2000);
    } else {
      response(this.states);
    }
  }

  private bindDropdown(subject, dropdown, busyIndicator) {
    busyIndicator.activated = true;
    // Retrieve data from rest service and apply to observer
    // setTimeout simulates the behaviour of a rest service
    setTimeout(() => {
      subject.next(this.states);
      dropdown.updated();
      busyIndicator.activated = false;
    }, 2000);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }
}
