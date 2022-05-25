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
  HostListener,
  AfterViewChecked,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'textarea[soho-textarea]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoTextAreaComponent)]
})
export class SohoTextAreaComponent extends BaseControlValueAccessor<string> implements AfterViewInit, AfterViewChecked, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private textStatic?: SohoTextAreaStatic;
  private options: SohoTextAreaOptions = {};

  /**
   * Local variables
   */
  private isDisabled?: boolean;
  private isReadOnly?: boolean;
  private runUpdatedOnCheck?: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------

  @Input() set disabled(value: boolean | undefined) {
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

      this.markForRefresh();
    }
  }

  get disabled(): boolean | undefined {
    return this.isDisabled;
  }

  @Input() set readonly(value: boolean | undefined) {
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

      this.markForRefresh();
    }
  }

  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  @HostBinding('class.resizable')
  @Input() resizable?: boolean = undefined;

  @Input() set maxLength(maxLength: number | undefined) {
    this.options.maxLength = maxLength;
    if (this.textStatic) {
      this.textStatic.settings.maxLength = maxLength;
    }

    if (this.textarea) {
      this.markForRefresh();
    }
  }

  get maxLength(): number | undefined {
    return this.options.maxLength;
  }

  @Input() set autoGrow(autoGrow: boolean | undefined) {
    this.options.autoGrow = autoGrow;
    if (this.textStatic) {
      this.textStatic.settings.autoGrow = autoGrow;
    }

    if (this.textarea) {
      this.markForRefresh();
    }
  }

  get autoGrow(): boolean | undefined {
    return this.options.autoGrow;
  }

  @Input() set autoGrowMaxHeight(autoGrowMaxHeight: number | undefined) {
    this.options.autoGrowMaxHeight = autoGrowMaxHeight;
    if (this.textStatic) {
      this.textStatic.settings.autoGrowMaxHeight = autoGrowMaxHeight;
    }

    if (this.textarea) {
      this.markForRefresh();
    }
  }

  get autoGrowMaxHeight(): number | undefined {
    return this.options.autoGrowMaxHeight;
  }

  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    this.options.attributes = attributes;
    if (this.textStatic) {
      this.textStatic.settings.attributes = attributes;
    }

    if (this.textarea) {
      this.markForRefresh();
    }
  }
  get attributes() {
    return this.options.attributes;
  }

  @Input() set characterCounter(characterCounter: boolean) {
    this.options.characterCounter = characterCounter;

    if (this.textarea) {
      this.markForRefresh();
    }
  }

  @Input() set printable(printable: boolean) {
    this.options.printable = printable;

    if (this.textarea) {
      this.markForRefresh();
    }
  }

  @Input() set charRemainingText(charRemainingText: string) {
    this.options.charRemainingText = charRemainingText;

    if (this.textarea) {
      this.markForRefresh();
    }
  }

  @Input() set charMaxText(charMaxText: string) {
    this.options.charMaxText = charMaxText;

    if (this.textarea) {
      this.markForRefresh();
    }
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /**
   * Called when the textarea updates in some way
   */
  @Output() updated = new EventEmitter<SohoTextAreaEvent>();

  /**
   * @todo Change to 'changed'.
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change: EventEmitter<SohoTextAreaEvent[]> = new EventEmitter<SohoTextAreaEvent[]>();

  // -------------------------------------------
  // Public API
  // -------------------------------------------


  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  // Reference to the SoHoXi control api.
  private textarea?: SohoTextAreaStatic | null;

  /**
   * Specific host listener for textarea.
   *
   * @param textarea the HTML element
   */
  @HostListener('input', ['$event', '$event.target']) oninput(event: SohoTextAreaEvent, textarea: HTMLTextAreaElement) {
    this.internalValue = textarea.value;
    super.writeValue(this.internalValue);
    this.change.emit([event]);
  }

  constructor(
    private element: ElementRef,
    public ref: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
    super();
  }

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Initialise the SohoXi Control
    this.jQueryElement.val((this.internalValue as any));
    this.jQueryElement.textarea(this.options);
    this.textarea = this.jQueryElement.data('textarea');

    if (this.isReadOnly) {
      this.textarea?.readonly();
    }

    if (this.isDisabled) {
      this.textarea?.disable();
    }

    if (this.internalValue) {
      this.jQueryElement.val(this.internalValue);
    }

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
      .on('change', (_e: any, args: any[]) => this.onChange(args))
      .on('updated', (_e: any, args: SohoTextAreaEvent) => this.updated.next(args));
    
    this.runUpdatedOnCheck = true;
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      this.ngZone.runOutsideAngular(() => {
        if (this.textarea) {
          this.textarea?.updated(this.options);
        }
        this.runUpdatedOnCheck = false;
      });
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
   * Override writeValue to allow the input to count correctly
   *
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);

    if (this.jQueryElement) {
      this.jQueryElement.val(value);
      if (this.textarea) {
        this.textarea.updateCounter();
        this.textarea.autoGrow();
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

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
   markForRefresh() {
    this.runUpdatedOnCheck = true;
    this.ref.markForCheck();
  }

  ngOnDestroy() {
    if (this.textarea) {
      this.textarea.destroy();
      this.textarea = null;
    }
  }
}
