import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

import { RadioControlValueAccessor } from '@angular/forms';

/**
 * This component does not extend the ControlValueAccessor
 * as Angular already implements RadioControlValueAccessor
 * which hooks the controls up to the Forms model, see
 * https://angular.io/api/forms/RadioControlValueAccessor.
 *
 * The requirement is that the control matches the following
 * selector:
 *
 * input[type=radio][formControlName]
 * input[type=radio][formControl]
 * input[type=radio][ngModel]
 *
 * Make sure you add `type="radio"` to your markup.
 */
@Component({
  selector: 'input[soho-radiobutton]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoRadioButtonComponent implements AfterViewInit {
  /** Current value. */
  @Input() value: any;

  /** Called when the radiobutton value changes.  */
  @Output() change = new EventEmitter<SohoRadioButtonEvent>();

  /** Bind attributes to the host input element. */
  @HostBinding('attr.type') get isRadioType() {
     return 'radio';
  }

  /** Sets the class attribute for the radio button */
  @HostBinding('class.radio') get isRadioButton() {
     return true;
  }

  /** Sets the element to disabled. */
  @HostBinding('attr.disabled') @Input() disabled: boolean;

  /** Sets the element to indicate checked. */
  @HostBinding('attr.checked') @Input() checked: boolean;

  /**
   * ---------------------------------------------------
   * Local variables
   * ---------------------------------------------------
   */

  /** JQuery Control. */
  private jQueryElement: JQuery;

  /**
   * Constructor.
   */
  constructor(
    private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // no control initializer for radiobutton

    if (this.value) {
      this.jQueryElement.val(this.value);
    }

    this.jQueryElement
      .on('change', (event: JQueryEventObject) => this.onChange(event));
  }

  onChange(event: JQueryEventObject) {
    const newValue = this.jQueryElement.val();

    // Update the model ...
    this.value = newValue;

    // Update the data.
    event.data = newValue;

    // ... then emit the changed value. (!)
    this.change.emit(event);
  }
}
