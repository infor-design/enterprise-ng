import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'textarea[soho-textarea]', // tslint:disable-line
  template: '<ng-content></ng-content>',
})
export class SohoTextAreaComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoTextAreaOptions = {
    characterCounter : undefined, // Turns on the character counter for the select element
    printable : undefined, // Sets the select element as printable
    charRemainingText : undefined, // Sets the select element remaining character text
    charMaxText : undefined // Sets the select element maximum character text
  };

  /**
   * Local variables
   */
  private isDisabled: boolean = null;
  private isReadOnly: boolean =  null;

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
  @Output() onChange = new EventEmitter<SohoTextareaEvent>();

  /**
   * Called when the textarea updates in some way
   */
  @Output() onUpdated = new EventEmitter<SohoTextareaEvent>();

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
  private textarea: any;

  constructor(private element: ElementRef) {

  }

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Initialise the SohoXi Control
    this.jQueryElement.textarea(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (e: any, args: SohoTextareaEvent) => this.onChange.next(args));
    this.jQueryElement.on('updated', (e: any, args: SohoTextareaEvent) => this.onUpdated.next(args));

    this.textarea = this.jQueryElement.data('textarea');
  }

  ngOnDestroy() {
    if (this.textarea) {
      this.textarea.destroy();
      this.textarea = null;
    }
  }
}
