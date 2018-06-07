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

@Component({
  template: `
  <form [formGroup]="formGroup">
    <div class="field">
      <input soho-radiobutton id="one" type="radio" name="one" value="1" checked formControlName="radiobutton" />
      <label soho-label for="one" [forRadioButton]="true">One</label>
      <input soho-radiobutton id="two" type="radio" name="two" value="2" checked formControlName="radiobutton"/>
      <label soho-label for="two" [forRadioButton]="true">Two</label>
    </div>
  </form>`
})
class SohoRadioButtonReactiveFormTestComponent {
  @ViewChild(SohoRadioButtonComponent) dropdown: SohoRadioButtonComponent;

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      radiobutton: '1'
    });
  }
}

describe('Soho RadioButton Reactive Form', () => {
  let dropdown: SohoRadioButtonComponent;
  let component: SohoRadioButtonReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoRadioButtonReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoRadioButtonReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoRadioButtonModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoRadioButtonReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-radiobutton][id="one"]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check "disabled" by default.', () => {
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');

    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('Check "enable".', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('Check "disabled".', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');
  });

  it('Check "value update".', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['input'].setValue(false);
    fixture.detectChanges();

    expect((el as HTMLInputElement).value).toBeFalsy('Selected');
  });
});
