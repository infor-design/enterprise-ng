import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

import {
  FormsModule,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';

import { SohoDatePickerModule } from './soho-datepicker.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoDatePickerComponent } from './soho-datepicker.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-datepicker name="datepicker" formControlName="datepicker" />
  </form>`
})
class SohoDatePickerReactiveFormTestComponent {
  public datepickerValue = '';

  @ViewChild(SohoDatePickerComponent) dropdown?: SohoDatePickerComponent;

  public formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      datepicker: [this.datepickerValue]
    });
  }
}

describe('SohoDatePickerComponent on Reactive Form', () => {
  let component: SohoDatePickerReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoDatePickerReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLTextAreaElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoDatePickerReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoDatePickerModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoDatePickerReactiveFormTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-datepicker]')).nativeElement;

    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('can be disabled', () => {
    component.formGroup.disable();
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled by default');
  });

  it('is enabled after call to enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('enable() removes disabled flag');
  });

  it('is disabled after call to disable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy('disable() adds disabled flag');
  });
});
