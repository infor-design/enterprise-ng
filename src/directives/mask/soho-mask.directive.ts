import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  selector: 'input[soho-mask]'
})
export class SohoMaskDirective implements AfterViewInit, OnDestroy {
  /**
   * Pattern for the mask
   */
  @Input() pattern: string = '';
  /**
   * Option defined in control, but not referenced
   */
  @Input() placeholder: string = '_';
  /**
   * Definitions of pattern(s) as a regular expression
   */
  @Input() definitions: any;
  /**
   * Indicates if each section of the group pattern match must be full in order for
   * the literals in-between each section to be automatically added (meaning you can't
   * type a literal to end that group until all characters in that group are entered).
   */
  @Input() groupComplete: boolean = false;
  /**
   * Indicates special formatting rules may apply to the mask
   */
  @Input() mode: SohoMaskMode = undefined;
  /**
   * Indicates to complete the full mask or the mask will revert to empty.
   */
  @Input() mustComplete: boolean = false;
  /**
   * Indicates you can enter the negative symbol in front of the number;
   * automatically set to true if a negative symbol is detected inside the mask.
   */
  @Input() negative: boolean = false;
  /**
   * Option defined in control, but not referenced
   */
  @Input() number: boolean = false;
  /**
   * Indicates to initially mask the value of the input field
   */
  @Input() processOnInitialize: boolean = true;
  /**
   * Indicates the thousands separator for numbers (based on localization) will be
   * inserted wherever necessary during typing; automatically set to true if the
   * localized thousands separator is detected inside the mask.
   */
  @Input() thousandsSeparator: boolean = false;
  /**
   * Indicates to display the localized symbol for currency or percent;
   * backwards compatible with old 'data-show-currency'; value true equates to currency
   */
  @Input() showSymbol: SohoMaskShowSymbol = false;

  /**
   * Called when mask value changes
   */
  @Output() write: EventEmitter<SohoMaskEvent> = new EventEmitter<SohoMaskEvent>();

  /**
   * Local variables
   */
  private jQueryElement: any;
  private mask: any;

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    let options: SohoMaskOptions = {
      pattern: this.pattern,
      placeholder: this.placeholder,
      definitions: this.definitions,
      groupComplete: this.groupComplete,
      mode: this.mode,
      mustComplete: this.mustComplete,
      negative: this.negative,
      number: this.number,
      processOnInitialize: this.processOnInitialize,
      thousandsSeparator: this.thousandsSeparator,
      showSymbol: this.showSymbol
    };

    this.jQueryElement.mask(options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('write.mask', (event: SohoMaskEvent) => { this.write.emit(event); });

    this.mask = this.jQueryElement.data('mask');
  }
  ngOnDestroy() {
    if (this.mask) {
      this.mask.destroy();
      this.mask = null;
    }
  }
}
