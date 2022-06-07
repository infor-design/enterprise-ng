import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { Component, DebugElement, ViewChild } from '@angular/core';

import {
  FormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { SohoMaskDirective } from './soho-mask.directive';
import { SohoMaskModule } from './soho-mask.module';
import { SohoInputModule } from '../input';
import { SohoLocaleModule } from '../locale';

@Component({
  template: `
    <div>
      <input
        soho-input
        soho-mask
        [sohoPattern]="'UUU'"
        [definitions]="definitions"
      />
    </div>
  `
})
class SohoCustomMaskTestComponent {
  @ViewChild(SohoMaskDirective) input?: SohoMaskDirective;

  public definitions: SohoMaskDefinitions = { U: /[A-Z]/ };
}

@Component({
  template: `
    <div>
      <form [formGroup]="demoForm">
        <input
          soho-mask
          formControlName="ctrl"
          [integerLimit]="3"
          [process]="'number'"
        />
      </form>
    </div>
  `
})
class SohoMaskTestComponent {
  @ViewChild(SohoMaskDirective) input?: SohoMaskDirective;

  public value?: string;

  public demoForm?: UntypedFormGroup;

  constructor(public formBuilder: UntypedFormBuilder) {
    this.createForm();
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.formBuilder.group({
      ctrl: [
        '111',
        [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
      ]
    });
  }
}

describe('Soho Mask Render', () => {
  let component: SohoMaskTestComponent;
  let fixture: ComponentFixture<SohoMaskTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoMaskTestComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SohoMaskModule,
        SohoInputModule,
        SohoLocaleModule
      ]
    });

    Soho.Locale.set('en-US').done(() => {
      fixture = TestBed.createComponent(SohoMaskTestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
  });

  it('should update control with new input', done => {
    const inp = fixture.debugElement.query(By.css('input'));
    expect(inp.nativeElement.value).toEqual('111');

    component.demoForm?.controls['ctrl'].setValue('222');
    inp.nativeElement.value = '222';

    fixture.detectChanges();

    expect(inp.nativeElement.value).toEqual('222');

    expect(component.demoForm?.controls['ctrl'].value).toBe('222');
    expect(component.demoForm?.controls['ctrl'].valid).toBeTruthy();
    done();
  });

  it('should update control with new input invalid', () => {
    const inp = fixture.debugElement.query(By.css('input'));
    expect(inp.nativeElement.value).toEqual('111');
    expect(component.demoForm?.controls['ctrl'].valid).toBeTruthy();

    component.demoForm?.controls['ctrl'].setValue('555555');

    expect(inp.nativeElement.value).toEqual('555555');

    expect(component.demoForm?.controls['ctrl'].value).toBe('555555');
    expect(component.demoForm?.controls['ctrl'].valid).toBeFalsy();
  });
});

describe('Soho Custom Mask Render', () => {
  let input: SohoMaskDirective;
  let component: SohoCustomMaskTestComponent;
  let fixture: ComponentFixture<SohoCustomMaskTestComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoCustomMaskTestComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SohoMaskModule,
        SohoInputModule
      ]
    });

    fixture = TestBed.createComponent(SohoCustomMaskTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;

    fixture.detectChanges();
    input = (component.input as any);
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    input.definitions = { U: /[A-Z]/ };
  });
});
