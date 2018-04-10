import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'textarea[soho-textarea]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ provideControlValueAccessor(SohoTextAreaComponent) ]
})
export class SohoTextAreaComponent extends BaseControlValueAccessor<string> implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoTextAreaOptions = {};

  /**
   * Local variables
   */
  private isDisabled: boolean;
  private isReadOnly: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------
  /**
   * @param disabled
   */
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;

    if (this.textarea) {
      if (value) {
        this.textarea.disable();
        this.isDisabled = true;
      } else {
        this.textarea.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * @param readonly
   */
  @Input() set readonly(value: boolean) {
    this.isReadOnly = value;

    if (this.textarea) {
      if (value) {
        this.textarea.readonly();
        this.isReadOnly = true;
      } else {
        this.textarea.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * @param resizable
   */
  @HostBinding('class.resizable')
  @Input() resizable: boolean = null;

  /**
   * @param maxlength
   */
  @HostBinding('attr.maxlength')
  @Input() maxlength: number;

  /**
   * @param characterCounter
   */
  @Input() set characterCounter(characterCounter: boolean) {
    this.options.characterCounter = characterCounter;
  }

  /**
   * @param printable
   */
  @Input() set printable(printable: boolean) {
    this.options.printable = printable;
  }

  /**
   * @param charRemainingText
   */
  @Input() set charRemainingText(charRemainingText: string) {
    this.options.charRemainingText = charRemainingText;
  }

  /**
   * @param charMaxText
   */
  @Input() set charMaxText(charMaxText: string) {
    this.options.charMaxText = charMaxText;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the textarea value changes
   */
  @Output() onChange = new EventEmitter<SohoTextAreaEvent>();

  /**
   * Called when the textarea updates in some way
   */
  @Output() onUpdated = new EventEmitter<SohoTextAreaEvent>();

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  get disabled() {
    return this.isDisabled;
  }
  get readonly() {
    return this.isReadOnly;
  }

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private textarea: SohoTextAreaStatic;

  constructor(private element: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Initialise the SohoXi Control
    this.jQueryElement.textarea(this.options);
    this.textarea = this.jQueryElement.data('textarea');

    if (this.isReadOnly) {
      this.textarea.readonly();
    }

    if (this.isDisabled) {
      this.textarea.disable();
    }

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (e: any, args: SohoTextAreaEvent) => this.onChange.next(args));
    this.jQueryElement.on('updated', (e: any, args: SohoTextAreaEvent) => this.onUpdated.next(args));
  }

  /**
   * Override writeValue to allow the input to count correctly
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);

    if (this.jQueryElement) {
      this.jQueryElement.val(value);
    }
  }

  ngOnDestroy() {
    if (this.textarea) {
      this.textarea.destroy();
      this.textarea = null;
    }
  }
}
