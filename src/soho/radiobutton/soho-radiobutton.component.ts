import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

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

  /** Sets the class attribute for the radio button. */
  @HostBinding('class.radio') get isRadioButton() {
    return true;
  }

  /**
   * Due to conflicts with the ReactiveForms API, this Input
   * and HostBinding has been removed, in favour of using
   * [attr.disabled]="isDisabled".
   */
 @Input() set disabled(value: boolean) {
   console.warn('The property `disabled` has been removed, please use [attr.disabled]="disable"');
 }

  /** Sets the element to indicate checked. */
  @HostBinding('attr.checked') @Input() checked: boolean;

  /**
   * ---------------------------------------------------
   * Local variables
   * ---------------------------------------------------
   */

  /** JQuery Component */
  private jQueryElement: JQuery;

  /**
   * Constructor.
   */
  constructor(
    private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // There is no control initializer for radiobutton, since its css based
    if (this.value) {
      this.jQueryElement.val(this.value);
    }

    this.jQueryElement
      .on('change', (event: SohoRadioButtonEvent) => this.onChange(event));
  }

  onChange(event: SohoRadioButtonEvent) {
    const newValue = this.jQueryElement.val();

    // Update the model
    this.value = newValue;

    // Update the data
    event.data = newValue;

    // Finally emit the changed value
    this.change.emit(event);
  }
}
