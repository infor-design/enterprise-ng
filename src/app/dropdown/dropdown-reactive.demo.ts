import {Component, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
// @ts-ignore
import { SohoDropDownComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-dropdown-reactive-demo',
    template: `
  <div class="example-section">
  <form>
    <div class="row">
      <h1>Reactive Dropdown</h1>
      <span class="code-tag">Live Example</span>
      <div class="row">
        <div class="field">
          <label for="states" class="label">States</label>
          <form [formGroup]="form">
            <select soho-dropdown formControlName="state" >
              <option *ngFor="let state of states" [ngValue]="state">
                {{ state.label }}
              </option>
            </select>
          </form>
        </div>
      </div>
    </div>
  </form>
  <button soho-button (click)="toggleModel()">{{showModel ? 'Hide' : 'Show'}} Model</button>
  <div *ngIf="showModel">
    <hr>
    <h3>{{ form.value | json }}</h3>
  </div>
</div>

  `,
    standalone: false
})
export class DropdownReactiveDemoComponent {

  @ViewChild(SohoDropDownComponent, { static: true }) dropdown?: any;
  states = [
    {label: 'Arizona', value: 'AZ'},
    {label: 'California', value: 'CA'},
    {label: 'Colorado', value: 'CO'},
    {label: 'New York', value: 'NY'},
    {label: 'Pennsylvania', value: 'PA'},
  ];

  form = new UntypedFormGroup({
    state: new UntypedFormControl(this.states[3]),
  });

  showModel?: boolean;

  toggleModel() {
    this.showModel = !this.showModel;
  }
}
