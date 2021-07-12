import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  FormsModule,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { SohoLookupModule } from './soho-lookup.module';
import { SohoLookupComponent } from './soho-lookup.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <input #disabledBound soho-lookup [disabled]="disabled">

    <input #isDisabledBound soho-lookup [isDisabled]="disabled">

    <input #attrDisabledBound soho-lookup [attr.disabled]="disabled ? '' : null">

    <input #reactiveFormBound [formControl]="reactiveControl" soho-lookup>
  `,
})
class DisabledTestComponent {
  @ViewChild("disabledBound", { read: ElementRef }) disabledBound!: ElementRef<HTMLInputElement>;
  @ViewChild("isDisabledBound", { read: ElementRef }) isDisabledBound!: ElementRef<HTMLInputElement>;
  @ViewChild("attrDisabledBound", { read: ElementRef }) attrDisabledBound!: ElementRef<HTMLInputElement>;
  @ViewChild("reactiveFormBound", { read: ElementRef }) reactiveFormBound!: ElementRef<HTMLInputElement>;

  reactiveControl = this.formBuilder.control("");
  disabled?: boolean;

  constructor(private formBuilder: FormBuilder) { }

  disableAll() {
    this.disabled = true;
    this.reactiveControl.disable();
  }

  enableAll() {
    this.disabled = false;
    this.reactiveControl.enable();
  }
}

describe('SohoLookupComponent disabled state', () => {

  let fixture: ComponentFixture<DisabledTestComponent>;
  let component: DisabledTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisabledTestComponent],
      imports: [
        SohoLookupModule,
        ReactiveFormsModule,
      ],
    });

    fixture = TestBed.createComponent(DisabledTestComponent);
    component = fixture.componentInstance;
  });

  describe("when initially disabled", () => {
    beforeEach(async () => {
      await disableAll();
    });

    it("should be disabled when [isDisabled] is true", async () => {
      await disableAll();
      expectDisabled(component.isDisabledBound)
    });

    it("should be enabled when [isDisabled] is false", async () => {
      await enableAll();
      expectEnabled(component.isDisabledBound)
    });

    it("should be disabled when [disabled] is true", async () => {
      await disableAll();
      expectDisabled(component.disabledBound)
    });

    it("should be enabled when [disabled] is false", async () => {
      await enableAll();
      expectEnabled(component.disabledBound)
    });

    it("should be disabled when [attr.disabled] is ''", async () => {
      await disableAll();
      expectDisabled(component.attrDisabledBound)
    });

    it("should be enabled when [attr.disabled] is null", async () => {
      await enableAll();
      expectEnabled(component.attrDisabledBound)
    });

    it("should be disabled when [formControl] is disabled", async () => {
      await disableAll();
      expectDisabled(component.reactiveFormBound)
    });

    it("should be enabled when [formControl] is enabled", async () => {
      await enableAll();
      expectEnabled(component.reactiveFormBound)
    });
  })

  describe("when initially enabled", () => {
    beforeEach(async () => {
      await enableAll();
    });

    it("should be disabled when [isDisabled] is true", async () => {
      await disableAll();
      expectDisabled(component.isDisabledBound)
    });

    it("should be enabled when [isDisabled] is false", async () => {
      await enableAll();
      expectEnabled(component.isDisabledBound)
    });

    it("should be disabled when [disabled] is true", async () => {
      await disableAll();
      expectDisabled(component.disabledBound)
    });

    it("should be enabled when [disabled] is false", async () => {
      await enableAll();
      expectEnabled(component.disabledBound)
    });

    it("should be disabled when [attr.disabled] is ''", async () => {
      await disableAll();
      expectDisabled(component.attrDisabledBound)
    });

    it("should be enabled when [attr.disabled] is null", async () => {
      await enableAll();
      expectEnabled(component.attrDisabledBound)
    });

    it("should be disabled when [formControl] is disabled", async () => {
      await disableAll();
      expectDisabled(component.reactiveFormBound)
    });

    it("should be enabled when [formControl] is enabled", async () => {
      await enableAll();
      expectEnabled(component.reactiveFormBound)
    });
  });

  async function disableAll() {
    await setAllDisabled(true);
  }

  async function enableAll() {
    await setAllDisabled(false);
  }

  async function setAllDisabled(disabled: boolean) {
    if (disabled) {
      component.disableAll();
    } else {
      component.enableAll();
    }
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function expectDisabled(element: ElementRef<HTMLInputElement>) {
    expect(element.nativeElement.disabled).toBeTrue();
  }

  function expectEnabled(element: ElementRef<HTMLInputElement>) {
    expect(element.nativeElement.disabled).toBeFalse();
  }
});
