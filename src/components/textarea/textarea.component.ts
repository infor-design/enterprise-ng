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

  /**
   * Turns on the character counter for the select element
   */
  @Input() characterCounter: boolean = true;

  /**
   * Sets the select element as printable
   */
  @Input() printable: boolean = true;

  /**
   * Sets the select element remianing character text
   */
  @Input() charRemainingText: string = null;

  /**
   * Sets the select element maximum character text
   */
  @Input() charMaxText: string = null;

  /**
 * Name for the textarea control. Necessary for ngModel to function
 */
  @Input() name: string = `soho-textarea`;

  /**
   * Sets the select element as disable
   */
  @HostBinding('attr.disable')
  @Input() disable: boolean = null;

  /**
   * Sets the select element as readonly
   */
  @HostBinding('attr.readonly')
  @Input() readonly: boolean = null;

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

  /**
   * Called when the textarea value changes
   */
  @Output() change: EventEmitter<Object> = new EventEmitter<Object>();
  /**
   * Called when the textarea updates in some way
   */
  @Output() updated: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Bind attributes to the host select element
   */
  /**
   * Assign the id for the control
   * (maps to the name to use on a label's 'for' attribute)
   */
  @HostBinding('id') get id() {
    return this.name;
  }
  @HostBinding('class.resizable') get isResizable() {
    return this.resizable;
  }
  @HostBinding('attr.disable') get isDisable() {
    return this.disable;
  }
  @HostBinding('attr.readonly') get isReadOnly() {
    return this.readonly;
  }
  @HostBinding('attr.maxlength') get getMaxlength() {
    return this.maxlength;
  }

  /**
   * Local variables
   */
  private jQueryElement: any;
  private textarea: any;

  constructor(private element: ElementRef) {

  }
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.textarea({
      characterCounter: this.characterCounter,
      printable: this.printable,
      charRemainingText: this.charRemainingText,
      charMaxText: this.charMaxText,
    });

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: any) => this.onChange(event));
    this.jQueryElement.on('updated', (event: any) => this.updated.emit(event));

    this.textarea = this.jQueryElement.data('textarea');
  }
  ngOnDestroy() {
    this.textarea.destroy();
  }
  onChange(event: any) {
    this.change.emit(event);
  }
}
