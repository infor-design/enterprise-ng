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

import { SohoEditorModule } from './soho-editor.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoEditorComponent } from './soho-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <div soho-editor id="editor" role="textbox" aria-multiline="true" aria-label="editor" formControlName="editor">
    </div>
  </form>`
})
class SohoEditorReactiveFormTestComponent {
  public editorValue = '1';

  @ViewChild(SohoEditorComponent) dropdown: SohoEditorComponent;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      editor: [this.editorValue]
    });
  }
}

describe('SohoEditorComponent on Reactive Form', () => {
  let dropdown: SohoEditorComponent;
  let component: SohoEditorReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoEditorReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoEditorReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoEditorModule, SohoLabelModule]
    });

    fixture = TestBed.createComponent(SohoEditorReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('div[soho-editor]')).nativeElement;

    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('Check "disabled" by default.', () => {
    expect($(el).hasClass('is-disabled')).toBeTruthy('disabled by default');
  });

  it('Check enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect($(el).hasClass('is-disabled')).toBeFalsy('enable() removes disabled flag');
  });

  it('Check "disabled".', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect($(el).hasClass('is-disabled')).toBeTruthy('disable() adds disabled flag');
  });

  it('Check "value update".', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['editor'].setValue('Hello World!');
    fixture.detectChanges();

    expect($(el).val()).toEqual('Hello World!');
  });
});
