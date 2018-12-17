/// <reference path="soho-textarea.d.ts" />

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

  private textStatic: SohoTextAreaStatic;
  private options: SohoTextAreaOptions = {};

  /**
   * Local variables
   */
  private isDisabled: boolean;
  private isReadOnly: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------

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

  @HostBinding('class.resizable')
  @Input() resizable: boolean = null;

  @Input() set maxLength(maxLength: number) {
    this.options.maxLength = maxLength;
    if (this.textStatic) {
      this.textStatic.settings.maxLength = maxLength;
    }
  }

  get maxLength() {
    return this.options.maxLength;
  }

  @Input() set autoGrow(autoGrow: boolean) {
    this.options.autoGrow = autoGrow;
    if (this.textStatic) {
      this.textStatic.settings.autoGrow = autoGrow;
    }
  }

  get autoGrow() {
    return this.options.autoGrow;
  }

  @Input() set autoGrowMaxHeight(autoGrowMaxHeight: number) {
    this.options.autoGrowMaxHeight = autoGrowMaxHeight;
    if (this.textStatic) {
      this.textStatic.settings.autoGrowMaxHeight = autoGrowMaxHeight;
    }
  }

  get autoGrowMaxHeight() {
    return this.options.autoGrowMaxHeight;
  }

  @Input() set characterCounter(characterCounter: boolean) {
    this.options.characterCounter = characterCounter;
  }

  @Input() set printable(printable: boolean) {
    this.options.printable = printable;
  }

  @Input() set charRemainingText(charRemainingText: string) {
    this.options.charRemainingText = charRemainingText;
  }

  @Input() set charMaxText(charMaxText: string) {
    this.options.charMaxText = charMaxText;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /**
   * Called when the textarea updates in some way
   */
  @Output() updated = new EventEmitter<SohoTextAreaEvent>();

  // @todo Change to 'changed'.
  @Output() change: EventEmitter<SohoTextAreaEvent[]> = new EventEmitter<SohoTextAreaEvent[]>();

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
    this.jQueryElement.val(this.internalValue);
    this.jQueryElement.textarea(this.options);
    this.textarea = this.jQueryElement.data('textarea');

    if (this.isReadOnly) {
      this.textarea.readonly();
    }

    if (this.isDisabled) {
      this.textarea.disable();
    }

    if (this.internalValue) {
      this.jQueryElement.val(this.internalValue);
    }

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
      .on('change', (e: any, args: any[]) => this.onChange(args))
      .on('updated', (e: any, args: SohoTextAreaEvent) => this.updated.next(args));
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
   * Override writeValue to allow the input to count correctly
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);

    if (this.jQueryElement) {
      this.jQueryElement.val(value);
      if (this.textarea) {
        this.textarea.updateCounter();
      }
    }
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    if (this.textarea) {
      this.textarea.destroy();
      this.textarea = null;
    }
  }
}
