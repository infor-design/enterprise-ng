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
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';

import { SohoTextAreaModule } from './soho-textarea.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoTextAreaComponent } from './soho-textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <textarea soho-textarea maxlength="90" name="textarea" formControlName="textarea"></textarea>
  </form>`
})
class SohoTextAreaReactiveFormTestComponent {
  public value = '1';

  @ViewChild(SohoTextAreaComponent) textarea?: SohoTextAreaComponent;

  public formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      textarea: [this.value]
    });
  }
}

describe('Soho TextArea Reactive Form', () => {
  let textarea: SohoTextAreaComponent;
  let component: SohoTextAreaReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoTextAreaReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLTextAreaElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoTextAreaReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoTextAreaModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoTextAreaReactiveFormTestComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.query(By.css('textarea[soho-textarea]')).nativeElement;

    fixture.detectChanges();
    textarea = (component.textarea as any);
  });

  it('..', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled by default');
  }));

  it('Check "disabled" by default.', () => {
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled by default');
  });

  it('Check enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('enable() removes disabled flag');
  });

  it('Check "disabled".', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy('disable() adds disabled flag');
  });

  it('Check "value update".', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['textarea'].setValue('2');
    fixture.detectChanges();

    expect(el.value).toEqual('2');
  });

  it('check inputs', () => {
    // test values at initial construction
    textarea.maxLength = 10;
    textarea.autoGrow = false;
    textarea.autoGrowMaxHeight = 0;

    // check options
    expect((component.textarea as any).options.maxLength).toEqual(10);
    expect((component.textarea as any).options.autoGrow).toEqual(false);
    expect((component.textarea as any).options.autoGrowMaxHeight).toEqual(0);

    fixture.detectChanges(); // detect changes to cause text area to be built.

    // test changing the values after initial construction
    textarea.maxLength = 20;
    textarea.autoGrow = true;
    textarea.autoGrowMaxHeight = 40;

    expect((component.textarea as any).options.maxLength).toEqual(20);
    expect((component.textarea as any).options.autoGrow).toEqual(true);
    expect((component.textarea as any).options.autoGrowMaxHeight).toEqual(40);
  });
});
