import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

/**
 * Wrapper for soho checkboxes.
 *
 * Note the control must have type="checkbox" for the values to be passed
 * to and from any ng model instances.
 */
@Component({
  selector: '[soho-checkbox]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoCheckBoxComponent implements AfterViewInit, OnDestroy {

  /**
   * Indicate that the checkbox is partial
   */
  @Input() partial?: boolean;

  /**
   * Indicate that the checkbox is displayed as a switch.
   */
  @Input() switch = false;

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('attr.type') get isCheckBoxType() {
    return 'checkbox';
  }
  @HostBinding('class.checkbox') get isCheckBox() {
    return !this.switch;
  }
  @HostBinding('class.partial') get isPartialCheckBox() {
    return this.partial ? true : false;
  }
  @HostBinding('attr.aria-checked') get isPartialAriaChecked() {
    return this.partial ? 'mixed' : null;
  }
  @HostBinding('class.switch') get isSwitch() {
    return this.switch;
  }

  @HostBinding('attr.checked') @Input() checked?: boolean;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /** Called when the checkbox value changes. */
  @Output() changeEvent = new EventEmitter<SohoCheckBoxEvent>();

  /** Called when the checkbox updates in some way. */
  @Output() updateEvent = new EventEmitter<SohoCheckBoxEvent>();

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('change', (event: SohoCheckBoxEvent) =>
        this.ngZone.run(() => this.changeEvent.emit(event)));

      this.jQueryElement.on('updated', (event: SohoCheckBoxEvent) =>
        this.ngZone.run(() => this.updateEvent.emit(event)));

      // no control initializer for checkbox
    });
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    // No jQuery control.
  }
}
