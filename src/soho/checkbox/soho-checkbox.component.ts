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
  selector: 'soho-checkbox',
  template: `<ng-content></ng-content>`
})
export class SohoCheckBoxComponent implements AfterViewInit, OnDestroy {

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
  private jQueryElement: any;

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
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {

  }

}
