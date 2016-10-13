import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SohoDropDownComponent } from '../../soho';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'soho-dropdown-demo',
  templateUrl: 'dropdown-crm.demo.html',
})
export class DropdownCRMDemoComponent implements OnInit {
  @ViewChild(SohoDropDownComponent) dropDownComponent: SohoDropDownComponent;
  private showModel: boolean = true;
  private form: FormGroup;

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
  private model = { value: 'CO' };
  private children: Subject<any> = new Subject<any>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    let group: {[key: string]: any} = [];
    group['testControl'] = new FormControl(this.model, null);
    this.form = new FormGroup(group);

    // Retrieve data from rest service and apply to observer
    // setTimeout simulates the behaviour of a rest service
    setTimeout(() => {
      this.children.next(this.states);
      this.changeDetectorRef.detectChanges();
      this.dropDownComponent.updated();
    }, 1000);
  }
  toggleModel() {
    this.showModel = !this.showModel;
  }
}
