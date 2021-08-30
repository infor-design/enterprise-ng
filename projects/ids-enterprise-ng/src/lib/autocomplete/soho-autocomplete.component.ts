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
  selector: 'input[soho-autocomplete]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoAutoCompleteComponent)]
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

  /** if true, causes filter results that don't match case to be thrown out. */
  @Input() set caseSensitive(caseSensitive: boolean) {
    this.options.caseSensitive = caseSensitive;
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

  @Input()
  public set attributes(attributes: Array<Object> | Object | undefined) {
    this.options.attributes = attributes;
  }

  public get attributes(): Array<Object> | Object | undefined {
    return this.options.attributes;
  }

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   *
   * @todo replace override of native attribute.
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change: EventEmitter<SohoInputEvent[]> = new EventEmitter<SohoInputEvent[]>();

  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() beforeopen: EventEmitter<SohoAutoCompleteEvent> = new EventEmitter<SohoAutoCompleteEvent>();

  @HostBinding('class.autocomplete') get isAutoComplete() {
    return true;
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Local variables
   */
  private isDisabled?: boolean | undefined;
  private isReadOnly?: boolean | undefined;
  private jQueryElement!: JQuery;
  private autocomplete!: SohoAutoCompleteStatic | undefined;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------

  @Input() set disabled(value: boolean | undefined) {
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

  get disabled(): boolean | undefined {
    return this.isDisabled;
  }


  @Input() set readonly(value: boolean | undefined) {
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

  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  constructor(private element: ElementRef) {
    super();
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(_event: KeyboardEvent) {
    // This is required if masking is used, otherwise the
    // the form binding does not see updates.
    this.internalValue = this.jQueryElement?.val() as string;
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Bind to jQueryElement's events
    this.jQueryElement
      .on('selected', (...args) => this.selected.emit(args))
      .on('change', (_e: any, args: any[]) => this.onChange(args))
      .on('beforeopen', (_e: any, args: SohoAutoCompleteEvent) => this.beforeopen.emit(args));

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
      this.autocomplete = undefined;
    }
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: any[]) {
    if (!event) {
      // sometimes the event is not available
      this.internalValue = this.jQueryElement?.val() as string;
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

  getValue(): string | undefined {
    return this.internalValue;
  }

  setValue(value: string) {
    this.writeValue(value);
  }

  /** For async methods, reinit autocomplete `source` setting. */
  public updated(): SohoAutoCompleteComponent {
    this.autocomplete?.updated();
    return this;
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
