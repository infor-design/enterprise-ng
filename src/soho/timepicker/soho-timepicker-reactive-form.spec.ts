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
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { SohoTimePickerModule } from './soho-timepicker.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoTimePickerComponent } from './soho-timepicker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-timepicker name="timepicker" formControlName="timepicker" />
  </form>`
})
class SohoTimePickerReactiveFormTestComponent {
  public timepickerValue = '12:00 AM';

  @ViewChild(SohoTimePickerComponent) dropdown: SohoTimePickerComponent;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      timepicker: [this.timepickerValue]
    });
  }
}

describe('Soho TimePicker Reactive Form', () => {
  let dropdown: SohoTimePickerComponent;
  let component: SohoTimePickerReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoTimePickerReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLTextAreaElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoTimePickerReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoTimePickerModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoTimePickerReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-timepicker]')).nativeElement;

    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('..', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled by default');
  }));

  it('is disabled by default.', () => {
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled by default');
  });

  it('is enabled after call to enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('enable() removes disabled flag');
  });

  it('is disabled after call to disable()".', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy('disable() adds disabled flag');
  });

  it('updates after Form Control model change', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['timepicker'].setValue('11:00 AM');
    fixture.detectChanges();

    expect(el.value).toEqual('11:00 AM');
  });
});
