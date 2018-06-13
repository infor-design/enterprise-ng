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

import { SohoLookupModule } from './soho-lookup.module';
import { SohoLookupComponent } from './soho-lookup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { productsColumns, productsData } from '../../app/lookup/mock.data';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-lookup formControlName="lookup" [columns]="lookupColumns" [dataset]="lookupData" field="productId" name="lookup" />
  </form>`
})
class SohoLookupReactiveFormTestComponent {
  @ViewChild(SohoLookupComponent) dropdown: SohoLookupComponent;

  formGroup: FormGroup;

  public lookupColumns = productsColumns;

  public lookupData = productsData;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      lookup: '2542205'
    });
  }
}

describe('SohoLookupComponent on ReactiveForm', () => {
  let dropdown: SohoLookupComponent;
  let component: SohoLookupReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoLookupReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoLookupReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoLookupModule]
    });

    fixture = TestBed.createComponent(SohoLookupReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-lookup]')).nativeElement;

    fixture.detectChanges();
  });

  it('is disabled by default.', () => {
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');

    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('is enabkled after call to enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('is disabled after call to disable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');
  });

  it('initial value is set.', () => {
    component.formGroup.enable();

    fixture.detectChanges();

    expect(el.value).toEqual('2542205');
  });

  it('control updated when model updated.', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['lookup'].setValue(2642205);
    fixture.detectChanges();

    expect(el.value).toEqual('2642205');
  });
});
