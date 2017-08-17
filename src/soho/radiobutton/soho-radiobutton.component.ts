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
} from 'soho/utils';

@Component({
  selector: 'input[soho-radiobutton]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoRadioButtonComponent)]
})
export class SohoRadioButtonComponent extends BaseControlValueAccessor<any> implements AfterViewInit {
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
    private element: ElementRef,
    changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // no control initializer for radiobutton

    if (this.internalValue) {
      this.jQueryElement.val(this.internalValue);
    }

    this.jQueryElement
      .on('change', (event: JQueryEventObject) => this.onChange(event));
  }

  onChange(event: JQueryEventObject) {
    const newValue = this.jQueryElement.val();

    if (this.internalValue !== newValue) {
      // Update the model ...
      this.internalValue = newValue;

      // Update the data.
      event.data = newValue;

      // ... then emit the changed value. (!)
      this.change.emit(event);
    }
  }
}
