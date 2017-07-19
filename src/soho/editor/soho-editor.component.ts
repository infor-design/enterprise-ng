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
  selector: '[soho-editor]', // tslint:disable-line
  template: '<ng-content></ng-content>',
})
export class SohoEditorComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoEditorOptions = {};

  /**
   * Local variables
   */
  private isDisabled: boolean = null;
  private isReadOnly: boolean =  null;

  @HostBinding('class.editor') get isEditor() {
    return true;
  }

  // -------------------------------------------
  // Component Input
  // -------------------------------------------
  /**
   * @param disabled
   */
  @Input() set disabled(value: boolean) {
    if (this.editor) {
      if (value) {
        this.editor.disable();
        this.isDisabled = true;
      } else {
        this.editor.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * @param readonly
   */
  @Input() set readonly(value: boolean) {
    if (this.editor) {
      if (value) {
        this.editor.readonly();
        this.isReadOnly = true;
      } else {
        this.editor.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * @param delay
   */
  @Input() set delay(delay: number) {
    this.options.delay = delay;
  }

  /**
   * @param firstHeader
   */
  @Input() set firstHeader(firstHeader: string) {
    this.options.firstHeader = firstHeader;
  }

  /**
   * @param secondHeader
   */
  @Input() set secondHeader(secondHeader: string) {
    this.options.secondHeader = secondHeader;
  }

  /**
   * @param placeholder
   */
  @Input() set placeholder(placeholder: string) {
    this.options.placeholder = placeholder;
  }

  /**
   * @param anchor
   */
  @Input() set anchor(anchor: SohoEditorAnchor) {
    this.options.anchor = anchor;
  }

  /**
   * @param image
   */
  @Input() set image(image: SohoEditorOptionsImage) {
    this.options.image = image;
  }

  /**
   * @param buttons
   */
  @Input() set buttons(buttons: SohoEditorButtons) {
    this.options.buttons = buttons;
    this.jQueryElement.trigger('updated');
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the editor value changes
   */
  @Output() change = new EventEmitter<SohoEditorEvent>();

  /**
   * Called when the editor updates in some way
   */
  @Output() updated = new EventEmitter<SohoEditorEvent>();

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
  private editor: SohoEditorStatic;

  constructor(private element: ElementRef) {

  }

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Initialise the SohoXi Control
    this.jQueryElement.editor(this.options);

    this.editor = this.jQueryElement.data('editor');

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (e: JQueryEventObject, args: SohoEditorEvent) => this. change.next(args));
    this.jQueryElement.on('updated', (e: JQueryEventObject, args: SohoEditorEvent) => this.updated.next(args));
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }
}
