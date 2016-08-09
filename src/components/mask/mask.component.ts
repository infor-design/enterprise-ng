import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

@Component({
  selector: 'input[soho-mask]',
  template: '<ng-content></ng-content>'
})
export class SohoMaskComponent implements AfterViewInit, OnDestroy {
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
  @Input() mode: string | 'group' | 'number' | 'date' | 'time' = undefined;
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
  @Input() showSymbol: boolean | 'currency' | 'percent' = false;

  /**
   * Called when mask value changes
   */
  @Output() write: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Local variables
   */
  private jQueryElement: any;
  private mask: any;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    // TODO: Figure out what element to send to jQuery to init the component
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.mask({
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
    });

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('write.mask', (event: MaskEvent) => { this.write.emit(event); });

    this.mask = this.jQueryElement.data('mask');
  }
  ngOnDestroy() {
    this.mask.destroy();
  }
}

export const MASK_COMPONENTS = [
  SohoMaskComponent
];

export interface MaskEvent {
  currentTarget: HTMLElement;
  data: any;
  delegateTarget: HTMLElement;
  handleObj: Object;
  isTrigger: number;
  namespace: string;
  result: any;
  rnamespace: any;
  target: HTMLElement;
  timeStamp: number;
  type: string;
}
