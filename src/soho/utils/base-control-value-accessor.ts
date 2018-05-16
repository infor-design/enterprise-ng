import {
  forwardRef,
  ChangeDetectorRef
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

export const NOOP: any = () => {};

/**
 * Base class for new components that need to support NgForms.
 */
export class BaseControlValueAccessor<T> implements ControlValueAccessor {

  /** Current value. */
  private _value: T;

  /** ControlValueAccessor method called when the attached control has changed, */
  protected _onChangeCallback: (_: T) => void = NOOP;

  /** ControlValueAccessor method called when the attached control has touched. */
  private _onTouchedCallback: () => void = NOOP;

  /** Gets the value for the control. */
  protected get internalValue(): T {
    return this._value;
  }

  /** Sets the value for the control. */
  protected set internalValue(newValue: T) {
    if (newValue !== this._value) {
      this._value = newValue;
      this._onChangeCallback(newValue);
    }
  }

  /**
   * When touched.
   */
  protected touched() {
    this._onTouchedCallback();
  }

  /**
   * -------------------------------------------------
   * ControlValueAccessor implementation
   * -------------------------------------------------
   */

  /**
   * Write a new value to the element.
   */
  writeValue(value: T) {
    this._value = value;
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: (_: T) => void): void {
    this._onChangeCallback = () => {
      fn(this.internalValue);
    };
  }

  /**
   * Set the function to be called when the control receives a touched event.
   */
  registerOnTouched(fn: () => void): void {
    this._onTouchedCallback = fn;
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    // NOP
  }
}

/**
 * Provider - adds the contol value accessor.
 */
export function provideControlValueAccessor(type: any): any {
  // creates an ngModel accessor to be used in components providers
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type), // tslint:disable-line
    multi: true
  };
}
