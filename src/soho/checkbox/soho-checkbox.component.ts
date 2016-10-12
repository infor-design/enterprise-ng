import {
  AfterViewInit,
  Component,
  HostBinding,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

@Component({
  selector: '[soho-checkbox]',
  template: `<ng-content></ng-content>`
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
    return this.partial ? "mixed" : null;
  }

  /**
   * @param disabled
   */
  @HostBinding('attr.disabled') @Input() disabled: boolean;

  /**
   * @param checked
   */
  @HostBinding('attr.checked') @Input() checked: boolean;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the checkbox value changes
   */
  @Output() onChange = new EventEmitter<SohoCheckBoxEvent>();

  /**
   * Called when the checkbox updates in some way
   */
  @Output() onUpdated = new EventEmitter<SohoCheckBoxEvent>();

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
    this.jQueryElement.on('change', (e: any, args: SohoCheckBoxEvent) => this.onChange.next(args));
    this.jQueryElement.on('updated', (e: any, args: SohoCheckBoxEvent) => this.onUpdated.next(args));

    // no control initializer for checkbox
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    // No jquery control.
  }

}
