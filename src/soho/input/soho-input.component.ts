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
import { BaseControlValueAccessor, provideControlValueAccessor } from '../utils';

@Component({
  selector:  'input[soho-input]', // tslint:disable-line
  template:  '<ng-content></ng-content>',
  providers: [ provideControlValueAccessor(SohoInputComponent) ]
})
export class SohoInputComponent extends BaseControlValueAccessor<any> implements AfterViewInit, OnDestroy {

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   */
  @Output() change: EventEmitter<SohoInputEvent[]> = new EventEmitter<SohoInputEvent[]>();

  /**
   * Local variables
   */
  private jQueryElement: JQuery;

  constructor(private element: ElementRef, private changeDetectionRef: ChangeDetectorRef) {
    super(changeDetectionRef);
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent, val) {
    // This is required if masking is used, otherwise the
    // the form binding does not see updates.
    // console.log(`onKeyUp: ${event} - "${this.value}"`)
    this.value = this.jQueryElement.val();
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (e: any, args: any[]) => this.onChange(args));

    // no control initializer for input

    if (this.value) {
      this.jQueryElement.val(this.value);
    }
  }

  ngOnDestroy() {
    // No jQuery control.
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: any) {
    // console.log(`onChange: ${event} - "${this.jQueryElement.val()}"`)
    if (!event) {
      // sometimes the event is not available
      this.value = this.jQueryElement.val();
      return;
    }

    this.change.emit(this.value);
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
}
