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

import { SohoRadioButtonModule } from './soho-radiobutton.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoRadioButtonComponent } from './soho-radiobutton.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-radiobutton type="radio" id="1" value="1" formControlName="radio" />
    <input soho-radiobutton type="radio" id="2" value="2" formControlName="radio"/>
  </form>`
})
class SohoRadioButtonReactiveFormTestComponent {
  public radioButtonValue = '1';

  @ViewChild(SohoRadioButtonComponent) dropdown: SohoRadioButtonComponent;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      radio: [this.radioButtonValue]
    });
  }
}

describe('SohoRadioButtonComponent on ReactiveForm', () => {
  let dropdown: SohoRadioButtonComponent;
  let component: SohoRadioButtonReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoRadioButtonReactiveFormTestComponent>;
  let de: DebugElement;
  let el1: HTMLInputElement;
  let el2: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoRadioButtonReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoRadioButtonModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoRadioButtonReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el1 = de.query(By.css('input[soho-radiobutton][value="1"]')).nativeElement;
    el2 = de.query(By.css('input[soho-radiobutton][value="2"]')).nativeElement;

    fixture.detectChanges();
  });

  it('is disabled by default.', () => {
    expect(el1.hasAttribute('disabled')).toBeTruthy('disabled by default');
    expect(el2.hasAttribute('disabled')).toBeTruthy('disabled by default');
  });

  it('is enabled after call to enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el1.hasAttribute('disabled')).toBeFalsy('enable() removes disabled flag');
    expect(el2.hasAttribute('disabled')).toBeFalsy('enable() removes disabled flag');
  });

  it('is disabled after call to disable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el1.hasAttribute('disabled')).toBeTruthy('disable() adds disabled flag');
    expect(el2.hasAttribute('disabled')).toBeTruthy('disable() adds disabled flag');
  });

  it('initial value is selected.', () => {
    component.formGroup.enable();

    fixture.detectChanges();

    expect(el1.checked).toBeTruthy('radio 1 should be selected ' + el1.attributes);
    expect(el2.checked).toBeFalsy('radio 2 should not be selected');
  });

  it('control updated when model updated.', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['radio'].setValue('2');
    fixture.detectChanges();

    expect(el1.checked).toBeFalsy('radio 1 should not be selected ' + el1.attributes);
    expect(el2.checked).toBeTruthy('radio 2 should be selected');
  });
});
