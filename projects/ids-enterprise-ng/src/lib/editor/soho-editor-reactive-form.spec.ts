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

import { SohoEditorModule } from './soho-editor.module';
import { SohoLabelModule } from '../label/soho-label.module';
import { SohoEditorComponent } from './soho-editor.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
  <form [formGroup]="formGroup">
    <div class="field">
      <span id="comments-label" class="label">Comments</span>
      <div soho-editor id="editor1" id="editor" role="textbox" aria-multiline="true" aria-label="editor" formControlName="editor">
        <p>Embrace <a href="http://en.wikipedia.org/wiki/e-commerce" class="hyperlink">e-commerce action-items</a>, reintermediate, ecologies paradigms wireless share life-hacks create innovative harness. Evolve solutions rich-clientAPIs synergies harness relationships virtual vertical facilitate end-to-end, wireless, evolve synergistic synergies.</p>
        <p>Cross-platform, evolve, ROI scale cultivate eyeballs addelivery, e-services content cross-platform leverage extensible viral incentivize integrateAJAX-enabled sticky evolve magnetic cultivate leverage; cutting-edge. Innovate, end-to-end podcasting, whiteboard streamline e-business social; compelling, "cross-media exploit infomediaries innovative integrate integrateAJAX-enabled." Killer interactive reinvent, cultivate widgets leverage morph.</p>
      </div>
    </div>
  </form>`
})
class SohoEditorReactiveFormTestComponent {
  public editorValue = '1';

  @ViewChild(SohoEditorComponent) editor?: SohoEditorComponent;

  public formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
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

    de = fixture.debugElement;
    el = de.query(By.css('div[soho-editor]')).nativeElement;

    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('Check "enabled" by default.', () => {
    expect($(el).hasClass('is-disabled')).toBeFalsy();
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
    // Enable the control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['editor'].setValue('Hello World!');
    fixture.detectChanges();

    expect($(el).html()).toEqual('Hello World!');
  });
});
