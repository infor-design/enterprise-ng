import { forwardRef } from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

/**
 * Base class for new components that need to support NgForms.
 */
export class BaseControlValueAccessor<T> implements ControlValueAccessor {

  /** Current value. */
  private _value: T;

  /** ControlValueAccessor method called when the attached control has changed, */
  private _onChangeCallback: any = (value: T) => { };

  /** ControlValueAccessor method called when the attached control has touched. */
  private _onTouchedCallback: any = () => { };

  /** Gets the value for the control. */
  protected get value(): T {
    return this._value;
  }

  /** Sets the value for the control. */
  protected set value(newValue: T) {
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
    // setTimeout here
    // Expression has changed after it was checked
    // This was mentioned in https://github.com/angular/angular/issues/6005
    // See bennadel's comment
    // https://www.bennadel.com/blog/3040-i-have-a-fundamental-misunderstanding-of-change-detection-in-angular-2-beta-8.htm
    // See Ward Bell's comment

    // OPEN RELATED TICKETS
    // https://github.com/angular/angular/issues/10131
    // https://github.com/angular/angular/issues/10816


    setTimeout(() => {
      this._value = value;
      // this._onChangeCallback(value);
    }, 1);
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: (_: any) => void): void {
    this._onChangeCallback = fn;
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
export function provideControlValueAccessor(type: any) {
  // creates an ngModel accessor to be used in components providers
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
