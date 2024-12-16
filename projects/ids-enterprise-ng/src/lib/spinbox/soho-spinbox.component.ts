import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  NgZone
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
    selector: 'input[soho-spinbox]', // eslint-disable-line
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideControlValueAccessor(SohoSpinboxComponent)],
    standalone: false
})
export class SohoSpinboxComponent extends BaseControlValueAccessor<number> implements AfterViewInit, AfterViewChecked, OnDestroy {

  /** Disabled flag - used by initialisation. */
  internalIsDisabled?: boolean;
  private runUpdatedOnCheck?: boolean;

  @Input() set disabled(value: boolean | undefined) {
    this.internalIsDisabled = value;
    if (this.spinbox) {
      if (value) {
        this.ngZone.runOutsideAngular(() => this.spinbox?.disable());
      } else {
        this.ngZone.runOutsideAngular(() => this.spinbox?.enable());
      }
    } else {
      this.runUpdatedOnCheck = true;
    }
  }
  get disabled(): boolean | undefined {
    return this.internalIsDisabled;
  }

  /**
   * @todo replace override of native element
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<number>();

  // Set the spinbox class.
  @HostBinding('class.spinbox') spinboxClass = true;

  @HostBinding('attr.type') get spinboxType() {
    return 'text';
  }

  @HostBinding('attr.id') @Input() id?: string;
  @HostBinding('attr.name') @Input() name?: string;
  @HostBinding('attr.min') @Input() min?: number;
  @HostBinding('attr.max') @Input() max?: number;

  /**
   * Value of the spin box.
   */
  @HostBinding('attr.value') @Input() public set value(val: number | string | any) {
    if (this.spinbox) {
      this.spinbox.updateVal(val);
    }
    this.internalValue = val;
  }
  public get value(): number | string | any {
    return this.internalValue;
  }

  @HostBinding('attr.step') @Input() step?: number;

  @Input() set attrDisabled(_value: boolean) {
    console.warn(`soho-spinbox 'disabled' input has been deprecated, please use '[attr.disabled]'.`);
  }

  private options: SohoSpinboxOptions = {};
  private jQueryElement?: JQuery;
  private spinbox?: SohoSpinboxStatic | null;

  updateVal(value: string | number) {
    if (this.spinbox) {
      this.spinbox.updateVal(value);
    }
    this.value = value as number;
  }

  /**
   * Creates an instance of SohoSpinboxComponent.
   *
   * @param element matched element.
   * @param ngZone angular zone.
   *
   */
  constructor(private element: ElementRef, private ngZone: NgZone) {
    super();
  }

  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);

      // initialise the spinbox control
      this.jQueryElement.spinbox(this.options);

      // extract the api
      this.spinbox = this.jQueryElement.data('spinbox');

      // @todo - add event binding control so we don't bind if not required.
      this.jQueryElement
        .on('change', (event: SohoSpinboxEvent) => this.onChange(event));

      // Make sure the value of the control is set appropriately.
      if (this.internalValue) {
        this.jQueryElement.val(this.internalValue);
      }

      this.runUpdatedOnCheck = true;
    });
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      // Enforce the initial disabled value (this handles the zone internall)
      this.disabled = this.internalIsDisabled;
      this.runUpdatedOnCheck = false;
    }
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }

      // Destroy any widget resources.
      this.spinbox?.destroy();
      this.spinbox = null;
    });
  }

  onChange(_event: SohoSpinboxEvent) {
    // When the request for data has completed, make sure we
    // update the 'dropdown' control.
    this.ngZone.run(() => {
      const newValue = this.jQueryElement?.val();
      if (this.internalValue !== newValue) {
        // Update the model ...
        this.internalValue = this.jQueryElement?.val() as number;

        // ... then emit the changed value.
        this.change.emit(this.internalValue);
      }
    });
  }

  /**
   * Override writeValue to allow the input element to be updated correctly.
   *
   * @param value the new value
   */
  writeValue(value: number) {
    super.writeValue(value);

    if (this.spinbox) {
      this.spinbox.updateVal(value);
    }
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
