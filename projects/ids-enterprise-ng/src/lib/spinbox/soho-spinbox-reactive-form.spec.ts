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

import { SohoSpinboxModule } from './soho-spinbox.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoSpinboxComponent } from './soho-spinbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-spinbox name="spinbox" min="-50" max="50" formControlName="spinbox" />
  </form>`
})
class SohoSpinboxReactiveFormTestComponent {
  public value = 25;

  @ViewChild(SohoSpinboxComponent) dropdown: SohoSpinboxComponent;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      spinbox: [this.value]
    });
  }
}

describe('SohoSpinboxComponent on ReactiveForm', () => {
  let dropdown: SohoSpinboxComponent;
  let component: SohoSpinboxReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoSpinboxReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSpinboxReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoSpinboxModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoSpinboxReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-spinbox]')).nativeElement;

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

  it('initial value is correct.', () => {
    component.formGroup.enable();

    fixture.detectChanges();

    expect(el.value).toEqual('25');
  });

  it('control updated when model updated.', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['spinbox'].setValue(30);
    fixture.detectChanges();

    expect(el.value).toEqual('30');
  });
});
