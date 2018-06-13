import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-autocomplete]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ provideControlValueAccessor(SohoAutoCompleteComponent) ]
})

export class SohoAutoCompleteComponent extends BaseControlValueAccessor<string> implements AfterViewInit, AfterViewChecked, OnDestroy {
  /** Options. */
  private options: SohoAutoCompleteOptions = {};

  /** Defines the data to use, must be specified for this component. */
  @Input() set source(source: SohoAutoCompleteSource) {
    this.options.source = source;
  }

  /** Object is passed into the source method, and augmented with parameters. */
  @Input() set sourceArguments(sourceArguments: string) {
    this.options.sourceArguments = sourceArguments;
  }

  /** Menu template, appropriate markup is expected. */
  @Input() set template(template: string) {
    this.options.template = template;
  }

  /** Filters based on the first character('startsWidth') of the string, or the entire string('contains') */
  @Input() set filterMode(filterMode: SohoAutoCompleteFilterMode) {
    this.options.filterMode = filterMode;
  }

  /** Delay between key strokes on the keypad before the end of typing */
  @Input() set delay(delay: number) {
    this.options.delay = delay;
  }

  /** Width of the open menu */
  @Input() set width(width: SohoAutoCompleteWidth) {
    this.options.width = width;
  }

  /** Offset, the left or top offset */
  @Input() set offset(offset: SohoAutoCompleteOffset) {
    this.options.offset = offset;
  }

  /** Selects first item menu */
  @Input() set autoSelectFirstItem(autoSelectFirstItem: boolean) {
    this.options.autoSelectFirstItem = autoSelectFirstItem;
  }

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   */
  @Output() change: EventEmitter<SohoInputEvent[]> = new EventEmitter<SohoInputEvent[]>();
  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @HostBinding('class.autocomplete') get isAutoComplete() { return true; }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  get disabled() {
    return this.isDisabled;
  }
  get readonly() {
    return this.isReadOnly;
  }

  /**
   * Local variables
   */
  private isDisabled: boolean = null;
  private isReadOnly: boolean =  null;
  private jQueryElement: JQuery;
  private autocomplete: SohoAutoCompleteStatic;

      // -------------------------------------------
  // Component Input
  // -------------------------------------------
  /**
   * @param value
   */
  @Input() set disabled(value: boolean) {
    if (value) {
      if (this.autocomplete) {
        this.autocomplete.disable();
      }
      this.isDisabled = true;
     } else {
      if (this.autocomplete) {
        this.autocomplete.enable();
      }
      this.isDisabled = false;
      this.isReadOnly = false;
      }
    }

    /**
   * @param value
   */
  @Input() set readonly(value: boolean) {
    if (this.autocomplete) {
      if (value) {
        this.autocomplete.readonly();
        this.isReadOnly = true;
      } else {
        this.autocomplete.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  constructor(private element: ElementRef) {
    super();
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent, val) {
    // This is required if masking is used, otherwise the
    // the form binding does not see updates.
    this.internalValue = this.jQueryElement.val() as string;
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Bind to jQueryElement's events
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
    this.jQueryElement
      .on('change', (e: any, args: any[]) => this.onChange(args));

    // Invoke the Autocomplete
    this.jQueryElement.autocomplete(this.options);
    this.autocomplete = this.jQueryElement.data('autocomplete');

    // Make sure the value of the control is set appropriately.
    if (this.internalValue) {
      this.jQueryElement.val(this.internalValue);
    }
  }

  ngAfterViewChecked() {
    this.disabled = this.isDisabled;
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      this.autocomplete.destroy();
      this.autocomplete = null;
    }
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: any[]) {
    if (!event) {
      // sometimes the event is not available
      this.internalValue = this.jQueryElement.val() as string;
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

   /** For async methods, reinit autocomplete `source` setting. */
  public updated(): SohoAutoCompleteComponent {
    this.autocomplete.updated();
    return this;
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
