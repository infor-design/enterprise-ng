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

import { SohoAutoCompleteModule } from './soho-autocomplete.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoAutoCompleteComponent } from './soho-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `
  <form [formGroup]="formGroup">
  <input soho-autocomplete type="text" [source]="autocompleteUrl" formControlName="autocomplete">
  </form>`
})
class SohoAutoCompleteReactiveFormTestComponent {
  public value = 'ND';

  autocompleteUrl = 'http://localhost:4200/app/demodata/states.demo.json?term=';

  @ViewChild(SohoAutoCompleteComponent) dropdown: SohoAutoCompleteComponent;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      autocomplete: [this.value]
    });
  }
}

describe('§SohoAutoCompleteComponent on Reactive Form', () => {
  let dropdown: SohoAutoCompleteComponent;
  let component: SohoAutoCompleteReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoAutoCompleteReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoAutoCompleteReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoAutoCompleteModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoAutoCompleteReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-autocomplete]')).nativeElement;

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

    expect($(el).val()).toEqual('ND');
  });

  it('control updated when model updated.', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['autocomplete'].setValue('WY');
    fixture.detectChanges();

    expect($(el).val()).toEqual('WY');
  });
});
