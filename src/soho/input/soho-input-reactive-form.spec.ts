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

import { SohoInputModule } from './soho-input.module';
import { SohoInputComponent } from './soho-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-input formControlName="input">
  </form>`
})
class SohoInputReactiveFormTestComponent {
  @ViewChild(SohoInputComponent) dropdown: SohoInputComponent;

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      input: 'Hello World'
    });
  }
}

describe('Soho Input Reactive Form', () => {
  let dropdown: SohoInputComponent;
  let component: SohoInputReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoInputReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoInputReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoInputModule]
    });

    fixture = TestBed.createComponent(SohoInputReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-input]')).nativeElement;

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

    component.formGroup.controls['input'].setValue('Good Bye');
    fixture.detectChanges();

    expect((el as HTMLInputElement).value).toEqual('Good Bye');
  });
});
