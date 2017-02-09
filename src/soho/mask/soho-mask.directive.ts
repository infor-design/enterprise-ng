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
  selector: 'input[soho-mask]' // tslint:disable-line
})
export class SohoMaskDirective implements AfterViewInit, OnDestroy {

  /** Private control options. */
  private _options: SohoMaskOptions = {};

  /** Sets all the options. */
  @Input() set options(value: SohoMaskOptions) {
    this._options = value;
    if (this.mask) {
      this.mask.settings = value;
      this.mask.updated();
    }
  }

  /** Pattern for the mask. */
  @Input() set pattern(value: string) {
    this._options.pattern = value;
    if (this.mask) {
      this.mask.settings.pattern = value;
      this.mask.updated();
    }
  }

  /** Option defined in control, but not referenced. */
  @Input() set placeholder(value: string) {
    this._options.placeholder = value;
    if (this.mask) {
      this.mask.settings.placeholder = value;
      this.mask.updated();
    }
  }

  /** Definitions of pattern(s) as a regular expression. */
  @Input() set definitions(value: {[key: string]: RegExp}) {
    this._options.definitions = value;
    if (this.mask) {
      this.mask.settings.definitions = value;
      this.mask.updated();
    }
  }

  /**
   * Indicates if each section of the group pattern match must be full in order for
   * the literals in-between each section to be automatically added (meaning you can't
   * type a literal to end that group until all characters in that group are entered).
   */
  @Input() set groupComplete(value: boolean) {
    this._options.groupComplete = value;
    if (this.mask) {
      this.mask.settings.groupComplete = value;
      this.mask.updated();
    }
  }

  /** Indicates special formatting rules may apply to the mask. */
  @Input() set mode(value: SohoMaskMode) {
    this._options.mode = value;
    if (this.mask) {
      this.mask.settings.mode = value;
      this.mask.updated();
    }
  }

  /** Indicates to complete the full mask or the mask will revert to empty. */
  @Input() set mustComplete(value: boolean) {
    this._options.mustComplete = value;
    if (this.mask) {
      this.mask.settings.mustComplete = value;
      this.mask.updated();
    }
  }

  /**
   * Indicates you can enter the negative symbol in front of the number;
   * automatically set to true if a negative symbol is detected inside the mask.
   */
  @Input() set negative(value: boolean) {
    this._options.negative = value;
    if (this.mask) {
      this.mask.settings.negative = value;
      this.mask.updated();
    }
  }

  /** Option defined in control, but not referenced. */
  @Input() set number(value: boolean) {
      this._options.number = value;
    if (this.mask) {
      this.mask.settings.number = value;
      this.mask.updated();
    }
  }

  /** Indicates to initially mask the value of the input field. */
  @Input() set processOnInitialize(value: boolean) {
    this._options.processOnInitialize = value;
    if (this.mask) {
      this.mask.settings.processOnInitialize = value;
      this.mask.updated();
    }
  }

  /**
   * Indicates the thousands separator for numbers (based on localization) will be
   * inserted wherever necessary during typing; automatically set to true if the
   * localized thousands separator is detected inside the mask.
   */
  @Input() set thousandsSeparator(value: boolean) {
    this._options.thousandsSeparator = value;
    if (this.mask) {
      this.mask.settings.thousandsSeparator = value;
      this.mask.updated();
    }
  }

  /**
   * Indicates to display the localized symbol for currency or percent;
   * backwards compatible with old 'data-show-currency'; value true equates to currency
   */
  @Input() set showSymbol(value: SohoMaskShowSymbol) {
    this._options.showSymbol = value;
    if (this.mask) {
      this.mask.settings.showSymbol = value;
      this.mask.updated();
    }
  }

  /**
   * Called when mask value changes
   */
  @Output() write: EventEmitter<SohoMaskEvent> = new EventEmitter<SohoMaskEvent>();

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private mask: SohoMaskStatic;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.mask(this._options);

    this.mask = this.jQueryElement.data('mask');

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
      .on('write.mask', (event: SohoMaskEvent) => { this.write.emit(event); });
  }

  /** Destructor. */
  ngOnDestroy() {
    if (this.mask) {
      this.mask.destroy();
      this.mask = null;
    }
  }
}
