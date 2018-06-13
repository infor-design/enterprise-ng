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

import { SohoColorPickerModule } from './soho-colorpicker.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoColorPickerComponent } from './soho-colorpicker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-colorpicker name="bgcolor" formControlName="colorpick" />
  </form>`
})
class SohoColorPickerReactiveFormTestComponent {
  public colorpickValue = 'red';

  @ViewChild(SohoColorPickerComponent) dropdown: SohoColorPickerComponent;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      colorpick: [this.colorpickValue]
    });
  }
}

describe('SohoColorPicker on ReactiveForm', () => {
  let dropdown: SohoColorPickerComponent;
  let component: SohoColorPickerReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoColorPickerReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoColorPickerReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoColorPickerModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoColorPickerReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-colorpicker]')).nativeElement;

    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('is disabled by default.', () => {
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

  it('is initialised with model value.', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect($(el).val()).toEqual('#RED');
  });

  it('control updated when model updated.', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['colorpick'].setValue('blue');
    fixture.detectChanges();

    expect($(el).val()).toEqual('blue');
  });
});
