import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: '[soho-checkbox]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoCheckBoxComponent implements AfterViewInit, OnDestroy {

  /**
   * Indicate that the checkbox is partial
   */
  @Input() partial: boolean;

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('attr.type') get isCheckBoxType() {
    return 'checkbox';
  }
  @HostBinding('class.checkbox') get isCheckBox() {
    return true;
  }
  @HostBinding('class.partial') get isPartialCheckBox() {
    return this.partial ? true : false;
  }
  @HostBinding('attr.aria-checked') get isPartialAriaChecked() {
    return this.partial ? 'mixed' : null;
  }

  /**
   * @param checked
   */
  @HostBinding('attr.checked') @Input() checked: boolean;

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
  private jQueryElement: JQuery;

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoCheckBoxEvent) => this.changeEvent.emit(event));
    this.jQueryElement.on('updated', (event: SohoCheckBoxEvent) => this.updateEvent.emit(event));

    // no control initializer for checkbox
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    // No jQuery control.
  }
}
