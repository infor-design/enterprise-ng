import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  HostListener,
  HostBinding,
  Input, NgZone
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-input]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoInputComponent)]
})
export class SohoInputComponent extends BaseControlValueAccessor<string> implements AfterViewInit, OnDestroy {

  /**
   * todo: work around until landmark can change code to allow the initial format.
   * Right now landmark initially formats the value to current locale.
   */
  @Input() fireInputEventKludge = true;

  
  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() change: EventEmitter<SohoInputEvent[]> = new EventEmitter<SohoInputEvent[]>();
  
  /**
   * Input controls managed their disabled state via the 'disabled' attribute.
   * We use null as the default, rather than false, to ensure the attribute is
   * not displayed.
   *
   *
   */
  @HostBinding('attr.disabled') @Input()
  isDisabled: boolean | undefined = undefined;
  
  /**
   * Clearable attribute. Adds a clear icon in input if true.
   */
  @HostBinding('attr.data-clearable') @Input()
  clearable: boolean | undefined = false;

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;

  /**
   * Constructor.
   *
   * @param element the owning element.
   * @param changeDetectionRef change detection.
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) {
    super();
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(_event: KeyboardEvent) {
    // This is required if masking is used, otherwise the
    // the form binding does not see updates.
    this.internalValue = this.jQueryElement?.val() as string;
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Bind to jQueryElement's events
    this.jQueryElement
      .on('change', (_e: any, args: any[]) => this.onChange(args));

    // There is no SoHoXi control initializer for input

    if (this.clearable) {
      (this.jQueryElement as any).clearable();
    }

    // Make sure the value of the control is set appropriately.
    if (this.internalValue) {
      this.jQueryElement.val(this.internalValue);
    }
  }

  ngOnDestroy() {
    // No jQuery control.
    this.jQueryElement?.off();
    this.jQueryElement?.remove();
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: any[]) {
    if (!event) {
      // sometimes the event is not available
      this.internalValue = this.jQueryElement?.val() as string;
      super.writeValue(this.internalValue);
      return;
    }

    this.change.emit(event);
  }

  /**
   * Override writeValue to allow the mask input
   * element to be updated correctly.
   *
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);

    if (this.jQueryElement) {
      // The processing is required to ensure we use the correct format
      // in the control.
      this.jQueryElement.val(value);

      if (this.fireInputEventKludge) {
        this.ngZone.runOutsideAngular(
          () => {
            setTimeout(() => {
              this.element.nativeElement.dispatchEvent(new Event('input'));
            });
          });
      }
    }
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean | undefined): void {
    this.isDisabled = isDisabled ? true : undefined;
  }

  getValue(): string | undefined {
    return this.internalValue;
  }

  setValue(value: string) {
    this.writeValue(value);
  }

  focus() {
    this.element.nativeElement.focus();
  }
}
