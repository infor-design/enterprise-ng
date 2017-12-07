import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ChangeDetectorRef
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-spinbox]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoSpinboxComponent)]
})
export class SohoSpinboxComponent extends BaseControlValueAccessor<number> implements AfterViewInit, OnDestroy {

  @Input() set disabled(disabled: boolean) {
    if (this.spinbox) {
      if (disabled) {
        this.spinbox.disable();
      } else {
        this.spinbox.enable();
      }
    }
  }

  get disabled(): boolean {
    return this.spinbox.isDisabled();
  }

  @Output() change = new EventEmitter<number>();

  // Set the spinbox class.
  @HostBinding('class.spinbox') spinboxClass = true;

  @HostBinding('attr.type') get spinboxType() {
    return 'text';
  }

  @HostBinding('attr.id') @Input() id: string;
  @HostBinding('attr.name') @Input() name: string;
  @HostBinding('attr.min') @Input() min: number;
  @HostBinding('attr.max') @Input() max: number;

  /**
   * Value of the spin box.
   */
  @HostBinding('attr.value') @Input() public set value(val: number) {
    if (this.spinbox) {
      this.spinbox.updateVal(val);
    }
    this.internalValue = val;
  }

  public get value() {
    return this.internalValue;
  }

  @HostBinding('attr.step') @Input() step: boolean;
  @HostBinding('attr.disabled') @Input() isDisabled: boolean;

  private options: SohoSpinboxOptions = {};
  private jQueryElement: JQuery;
  private spinbox: SohoSpinboxStatic;

  updateVal(value: string | number) {
    if (this.spinbox) {
      this.spinbox.updateVal(value);
    }
    this.value = <number> value;
  }

  constructor(
    private element: ElementRef,
    changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.spinbox(this.options);

    // Bind to jQueryElement's events
    this.jQueryElement
      .on('change', (event: SohoSpinboxEvent) => this.onChange(event));

    this.spinbox = this.jQueryElement.data('spinbox');

    // Make sure the value of the control is set appropriately.
    if (this.internalValue) {
      this.jQueryElement.val(this.internalValue);
    }
  }

  onChange(event: SohoSpinboxEvent) {
    const newValue = this.jQueryElement.val();
    if (this.internalValue !== newValue) {
      // Update the model ...
      this.internalValue = <number>this.jQueryElement.val();

      // ... then emit the changed value.
      this.change.emit(this.internalValue);
    }
  }

  /**
   * Override writeValue to allow the input element to be updated correctly.
   *
   * @param value the new value
   */
  writeValue(value: number) {
    super.writeValue(value);

    if (this.jQueryElement) {
      // The processing is required to ensure we use the correct format
      // in the control.
      this.jQueryElement.val(value);
    }
  }

  ngOnDestroy() {
    if (this.spinbox) {
      this.spinbox.destroy();
      this.spinbox = null;
    }
  }
}
