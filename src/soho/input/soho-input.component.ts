import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  HostListener
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector:  'input[soho-input]', // tslint:disable-line
  template:  '<ng-content></ng-content>',
  providers: [ provideControlValueAccessor(SohoInputComponent) ]
})
export class SohoInputComponent extends BaseControlValueAccessor<string> implements AfterViewInit, OnDestroy {

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   */
  @Output() change: EventEmitter<SohoInputEvent[]> = new EventEmitter<SohoInputEvent[]>();

  /**
   * Local variables
   */
  private jQueryElement: JQuery;

  /**
   * Constructor.
   *
   * @param element the owning element.
   * @param changeDetectionRef change detection.
   */
  constructor(private element: ElementRef, private changeDetectionRef: ChangeDetectorRef) {
    super(changeDetectionRef);
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent, val) {
    // This is required if masking is used, otherwise the
    // the form binding does not see updates.
    this.internalValue = this.jQueryElement.val();
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Bind to jQueryElement's events
    this.jQueryElement
      .on('change', (e: any, args: any[]) => this.onChange(args));

    // There is no SoHoXi control initializer for input

    // Make sure the value of the control is set appropriately.
    if (this.internalValue) {
      this.jQueryElement.val(this.internalValue);
    }
  }

  ngOnDestroy() {
    // No jQuery control.
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: any[]) {
    // console.log(`onChange: ${event} - "${this.jQueryElement.val()}"`)
    if (!event) {
      // sometimes the event is not available
      this.internalValue = this.jQueryElement.val();
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
    }
  }

  getValue(): string {
    return this.internalValue;
  }

  setValue(value: string) {
    this.writeValue(value);
  }

  focus() {
    this.element.nativeElement.focus();
  }
}
