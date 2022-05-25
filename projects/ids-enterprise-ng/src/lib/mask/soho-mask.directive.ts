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
  selector: 'input[soho-mask]' // eslint-disable-line
})
export class SohoMaskDirective implements AfterViewInit, OnDestroy {

  /** Private control options. */
  private _options: SohoMaskOptions;
  private _patternOptions: SohoMaskPatternOptions;
  private _symbols: SohoMaskPatternSymbols;

  /** Sets all the options. */
  @Input() set options(value: SohoMaskOptions | string) {
    this._options = (typeof value === 'string') ? JSON.parse(value) : value;
    if (this.mask) {
      // After the mask has been created do not overwrite the mask.settings.
      // That will cause certain required defaults to go missing out of the mask.settings object.
      // Instead just call updated() with the new _options. The mask-input.js update() function
      // merges the new setting in w/o losing any important default.
      this.mask.updated(this._options);
    }
  }

  /** Definitions of pattern(s) as a regular expression. */
  @Input() set definitions(value: { [key: string]: RegExp }) {
    this._options.definitions = value;
    if (this.mask) {
      (this.mask as any).settings.definitions = value;
      this.mask.updated();
    }
  }

  /** When true, appends the leftover characters in the placeholder to the conformed value. */
  @Input() set guide(value: boolean) {
    this._options.guide = value;
    if (this.mask) {
      this.mask.settings.guide = value;
      this.mask.updated();
    }
  }

  /** When true, keeps groups of character intact. */
  @Input() set keepCharacterPositions(value: boolean) {
    this._options.keepCharacterPositions = value;
    if (this.mask) {
      this.mask.settings.keepCharacterPositions = value;
      this.mask.updated();
    }
  }

  /** Function that replaces the internal masking functionality. */
  @Input() set maskAPI(value: Function) {
    this._options.maskAPI = value;
    if (this.mask) {
      this.mask.settings.maskAPI = value;
      this.mask.updated();
    }
  }

  /**
   *  The pattern to use for the mask.
   *
   * This uses the sohoPrefix otherwise the pattern interferes
   * with the pattern on form groups.
   */
  @Input() set sohoPattern(value: SohoMaskPattern) {
    this._options.pattern = value;
    if (this.mask) {
      this.mask.settings.pattern = value;
      this.mask.updated();
    }
  }

  /** Function that is executed after the masking process is complete. */
  @Input() set pipe(value: Function) {
    this._options.pipe = value;
    if (this.mask) {
      this.mask.settings.pipe = value;
      this.mask.updated();
    }
  }

  /** The placeholder text for the mask. */
  @Input() set placeholder(value: string) {
    this._options.placeholderChar = value;
    if (this.mask) {
      this.mask.settings.placeholderChar = value;
      this.mask.updated();
    }
  }

  /** Indicates special formatting rules may apply to the mask. */
  @Input() set process(value: SohoMaskProcess) {
    this._options.process = value;
    if (this.mask) {
      this.mask.settings.process = value;
      this.mask.updated();
    }
  }

  /** When true, the onblur event executes mask processing. */
  @Input() set processOnBlur(value: boolean) {
    this._options.processOnBlur = value;
    if (this.mask) {
      this.mask.settings.processOnBlur = value;
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

  /** The pattern options. */
  @Input() set patternOptions(value: SohoMaskPatternOptions | string) {
    this._options.patternOptions = (typeof value === 'string') ? JSON.parse(value) : value;
    if (this.mask) {
      this.mask.settings.patternOptions = this._options.patternOptions;
      this.mask.updated();
    }
  }

  /** When true, the decimal separator symbol is allowed in a formatted number. */
  @Input() set allowDecimal(value: boolean) {
    (this._options as any).patternOptions.allowDecimal = value;
    if (this.mask) {
      (this.mask.settings as any).patternOptions.allowDecimal = value;
      this.mask.updated();
    }
  }

  /** When true, allows leading zeros in a formatted number. */
  @Input() set allowLeadingZeros(value: boolean) {
    (this._options as any).patternOptions.allowLeadingZeros = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.allowLeadingZeros = value;
      this.mask.updated();
    }
  }

  /** When true, the negative symbol is allowed in a formatted number. */
  @Input() set allowNegative(value: boolean) {
    (this._options as any).patternOptions.allowNegative = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.allowNegative = value;
      this.mask.updated();
    }
  }

  /** When true, adds the thousands separator symbol to the correct location in a formatted number. */
  @Input() set allowThousandsSeparator(value: boolean) {
    (this._options as any).patternOptions.allowThousandsSeparator = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.allowThousandsSeparator = value;
      this.mask.updated();
    }
  }

  /** The maximum number of digits to the left of the decimal separator symbol in a formatted number. */
  @Input() set decimalLimit(value: number) {
    (this._options as any).patternOptions.decimalLimit = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.decimalLimit = value;
      this.mask.updated();
    }
  }

  /** The maximum number of digits to the right of decimal separator symbol in a formatted number. */
  @Input() set integerLimit(value: number) {
    (this._options as any).patternOptions.integerLimit = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.integerLimit = value;
      this.mask.updated();
    }
  }

  /** The character that precedes the masked value. */
  @Input() set prefix(value: string) {
    (this._options as any).patternOptions.prefix = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.prefix = value;
      this.mask.updated();
    }
  }

  /** When true, the decimal separator symbol is required in a formatted number. */
  @Input() set requireDecimal(value: boolean) {
    (this._options as any).patternOptions.requireDecimal = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.requireDecimal = value;
      this.mask.updated();
    }
  }

  /** The character that follows the masked value. */
  @Input() set suffix(value: string) {
    (this._options as any).patternOptions.suffix = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.suffix = value;
      this.mask.updated();
    }
  }

  /** The symbols to use for the formatted number. */
  @Input() set symbols(value: SohoMaskPatternSymbols | string) {
    (this._options as any).patternOptions.symbols = (typeof value === 'string') ? JSON.parse(value) : value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.symbols = (this._options as any).patternOptions.symbols;
      this.mask.updated();
    }
  }

  /** The locale to use for the formatted number. */
  @Input() set locale(value: string) {
    (this._options as any).patternOptions.locale = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.locale = (this._options as any).patternOptions.locale;
      this.mask.updated();
    }
  }

  /** The currency symbol to use for the formatted number. */
  @Input() set currencySymbol(value: string) {
    (this._options as any).patternOptions.symbols.currency = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.symbols.currency = value;
      this.mask.updated();
    }
  }

  /** The decimal separator symbol to use for the formatted number. */
  @Input() set decimalSymbol(value: string) {
    (this._options as any).patternOptions.symbols.decimal = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.symbols.decimal = value;
      this.mask.updated();
    }
  }

  /** The negative symbol to use for the formatted number. */
  @Input() set negativeSymbol(value: string) {
    (this._options as any).patternOptions.symbols.negative = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.symbols.negative = value;
      this.mask.updated();
    }
  }

  /** The thousands separator symbol to use for the formatted number. */
  @Input() set thousandsSymbol(value: string) {
    (this._options as any).patternOptions.symbols.thousands = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.symbols.thousands = value;
      this.mask.updated();
    }
  }

  // deprecated methods
  /**
   * Indicates if each section of the group pattern match must be full in order for
   * the literals in-between each section to be automatically added (meaning you can't
   * type a literal to end that group until all characters in that group are entered).
   *
   * @deprecated not supported
   */
  @Input() set groupComplete(_value: boolean) {
    console.warn('The groupComplete input is no longer supported, please remove your usage.');
  }

  /**
   * Indicates special formatting rules may apply to the mask.
   *
   * @deprecated use process instead
   */
  @Input() set mode(value: SohoMaskMode) { // eslint-disable-line
    console.warn('The mode input has been renamed, please use the process input instead.');

    (this._options as any).process = value;
    if (this.mask) {
      this.mask.settings.process = value;
      this.mask.updated();
    }
  }

  /**
   * Indicates to complete the full mask or the mask will revert to empty.
   *
   * @deprecated not supported
   */
  @Input() set mustComplete(_value: boolean) {
    console.warn('The mustComplete input is no longer supported, please remove your usage.');
  }

  /**
   * Indicates you can enter the negative symbol in front of the number;
   * automatically set to true if a negative symbol is detected inside the mask.
   *
   * @deprecated use allowNegative instead
   */
  @Input() set negative(value: boolean) {
    console.warn('The negative input has been renamed, please use the allowNegative input instead.');

    (this._options as any).patternOptions.allowNegative = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.allowNegative = value;
      this.mask.updated();
    }
  }

  /**
   * Option defined in control, but not referenced.
   *
   * @deprecated
   */
  @Input() set number(_value: boolean) {
    console.warn('The number input is no longer supported, please remove your usage.');
  }

  /**
   * Indicates the thousands separator for numbers (based on localization) will be
   * inserted wherever necessary during typing; automatically set to true if the
   * localized thousands separator is detected inside the mask.
   *
   * @deprecated use allowThousandsSeparator instead
   */
  @Input() set thousandsSeparator(value: boolean) {
    console.warn('The thousandsSeparator input has been renamed, please use the allowThousandsSeparator input instead.');

    (this._options as any).patternOptions.allowThousandsSeparator = value;
    if (this.mask) {
      (this.mask as any).settings.patternOptions.allowThousandsSeparator = value;
      this.mask.updated();
    }
  }

  /**
   * Indicates to display the localized symbol for currency or percent;
   * backwards compatible with old 'data-show-currency'; value true equates to currency
   *
   * @deprecated use prefix or suffix instead
   */
  @Input() set showSymbol(_value: SohoMaskShowSymbol) { // eslint-disable-line
    console.warn('The showSymbol input is no longer supported, please use the prefix or suffix input instead.');
  }

  /**
   * Called when mask value changes
   */
  @Output() write: EventEmitter<SohoMaskEvent> = new EventEmitter<SohoMaskEvent>();

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private mask?: SohoMaskStatic | null;

  constructor(private element: ElementRef) {
    this._symbols = {};
    this._patternOptions = {
      symbols: this._symbols
    };
    this._options = {
      patternOptions: this._patternOptions
    };
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.mask(this._options);

    this.mask = this.jQueryElement.data('mask');

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
      .on('write.mask', (event: SohoMaskEvent) => {
        this.write.emit(event);
      });
  }

  /** Destructor. */
  ngOnDestroy() {
    if (this.jQueryElement) {
      this.jQueryElement.off();
      this.jQueryElement = undefined;
    }
    if (this.mask) {
      this.mask.destroy();
      this.mask = null;
    }
  }
}
