import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  UntypedFormBuilder
} from '@angular/forms';

import { SohoLookupModule } from './soho-lookup.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <input #disabledBound soho-lookup [disabled]="disabled">

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

  constructor(private formBuilder: UntypedFormBuilder) { }

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

    it("should be disabled when [disabled] is true", async () => {
      await disableAll();
      expectDisabled(component.disabledBound)
    });

    it("should be enabled when [disabled] is false", async () => {
      await enableAll();
      expectEnabled(component.disabledBound)
    });

    xit("should be disabled when [attr.disabled] is ''", async () => {
      // @todo - the use of attr.disabled is an issue here, as the component holds the disabled state and does not
      // extract this from the markup.
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
