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

import { SohoCheckBoxModule } from './soho-checkbox.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoCheckBoxComponent } from './soho-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `
  <form [formGroup]="formGroup">
  <input soho-checkbox type="checkbox" formControlName="checkbox" >
  </form>`
})
class SohoCheckBoxReactiveFormTestComponent {
  public value = true;

  @ViewChild(SohoCheckBoxComponent) dropdown: SohoCheckBoxComponent;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      checkbox: [this.value]
    });
  }
}

describe('SohoCheckBoxComponent on Reactive Form', () => {
  let dropdown: SohoCheckBoxComponent;
  let component: SohoCheckBoxReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoCheckBoxReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoCheckBoxReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoCheckBoxModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoCheckBoxReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-checkbox]')).nativeElement;

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

    expect(el.checked).toBeTruthy('checkbox should be checked by default.');
  });

  it('control updated when model updated.', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['checkbox'].setValue(false);
    fixture.detectChanges();

    expect(el.checked).toBeFalsy('check should not be checked');
  });
});
