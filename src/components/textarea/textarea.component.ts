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
  selector: 'textarea[soho-textarea]',
  template: '<ng-content></ng-content>',
})
export class SohoTextareaComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoTextareaOptions = {
    characterCounter : true, //Turns on the character counter for the select element
    printable : true, //Sets the select element as printable
    charRemainingText : null, //Sets the select element remaining character text
    charMaxText : null //Sets the select element maximum character text
  };

  /**
   * Sets the select element as disable
   */
  @Input() disable: boolean = null;

  /**
   * Sets the select element as readonly
   */
  @Input() readonly: boolean =  null;

  /**
   * Sets the select element as resizable
   */
  @HostBinding('class.resizable')
  @Input() resizable: boolean = null;

  /**
   * Sets the element maximum length
   */
  @HostBinding('attr.maxlength')
  @Input() maxlength: number;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the textarea value changes
   */
  @Output() onChange = new EventEmitter<TextareaEvent>();

  /**
   * Called when the textarea updates in some way
   */
  @Output() onUpdated = new EventEmitter<TextareaEvent>();

  // Enable or disable textarea control
  @Input() set setDisable(value: boolean) {
    if (this.textarea) {
      if (value) {
        this.textarea.disable();
        this.disable = true;
      } else {
        this.textarea.enable();
        this.disable = false;
        this.readonly = false;
      }
    }
  }

  // Set textarea control to be readonly
  @Input() set setReadonly(value: boolean) {
    if (this.textarea) {
      if (value) {
        this.textarea.readonly();
        this.readonly = true;
      }
    }
  }

  get isResizable() {
    return this.resizable;
  }
  get getDisable() {
    return this.disable;
  }
  get getReadonly() {
    return this.readonly;
  }
  get getMaxlength() {
    return this.maxlength;
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
    this.jQueryElement.on('change', (e: any, args: TextareaEvent) => this.onChange.next(args));
    this.jQueryElement.on('updated', (e: any, args: TextareaEvent) => this.onUpdated.next(args));

    this.textarea = this.jQueryElement.data('textarea');
  }
  ngOnDestroy() {
    if (this.textarea) {
      this.textarea.destroy();
      this.textarea = null;
    }
  }
}
/**
 * Soho Textarea Event
 */
export interface TextareaEvent {
}
