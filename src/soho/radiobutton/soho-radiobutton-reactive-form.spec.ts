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
    <div class="field">
      <input soho-radiobutton type="radio" id="1" value="1" checked formControlName="radio" />
      <label soho-label for="2" [forRadioButton]="true">One</label>
      <input soho-radiobutton type="radio" id="2" value="2" formControlName="radio"/>
      <label soho-label for="1" [forRadioButton]="true">Two</label>
    </div>
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

describe('Soho RadioButton Reactive Form', () => {
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
    fixture.detectChanges();fixture.detectChanges();


  });

  it('..', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(el1.hasAttribute('disabled')).toBeTruthy('disabled by default');
    expect(el2.hasAttribute('disabled')).toBeTruthy('disabled by default');
  }));

  it('Check "disabled" by default.', () => {
    expect(el1.hasAttribute('disabled')).toBeTruthy('disabled by default');
    expect(el2.hasAttribute('disabled')).toBeTruthy('disabled by default');
  });

  it('Check enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el1.hasAttribute('disabled')).toBeFalsy('enable() removes disabled flag');
    expect(el2.hasAttribute('disabled')).toBeFalsy('enable() removes disabled flag');
  });

  it('Check "disabled".', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el1.hasAttribute('disabled')).toBeTruthy('disable() adds disabled flag');
    expect(el2.hasAttribute('disabled')).toBeTruthy('disable() adds disabled flag');
  });

  it('Check default selected".', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el1.hasAttribute('selected')).toBeTruthy('radio 1 should be selected');
    expect(el2.hasAttribute('selected')).toBeFalsy('radio 2 should not be selected');
  });
  it('Check "value update".', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['radio'].setValue('2');
    fixture.detectChanges();

    expect(el1.hasAttribute('selected')).toBeFalsy('radio 1 should not be selected');
    expect(el2.hasAttribute('selected')).toBeTruthy('radio 2 should be selected');
  });
});
