import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { SohoDropDownModule } from './soho-dropdown.module';
import { SohoDropDownComponent } from './soho-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <select soho-dropdown formControlName="state">
      <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
    </select>
  </form>`
})
class SohoDropDownReactiveFormTestComponent {
  @ViewChild(SohoDropDownComponent) dropdown: SohoDropDownComponent;

  public options = [
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

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      state: 'ND'
    });
  }
}

describe('SohoDropdownComponent on ReactiveForms', () => {
  let dropdown: SohoDropDownComponent;
  let component: SohoDropDownReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoDropDownReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoDropDownReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoDropDownModule]
    });

    fixture = TestBed.createComponent(SohoDropDownReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('select[soho-dropdown]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check "disabled" by default.', () => {
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');

    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('is enabled after call to enable()', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('is disabled after call to disable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');
  });

  it('control updated when model updated.', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['state'].setValue('WY');

    expect($(el).val()).toEqual('WY');
  });
});
