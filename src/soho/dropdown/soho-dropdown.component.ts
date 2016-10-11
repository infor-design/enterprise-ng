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
import { NgModel } from '@angular/forms';

let counter = 0;

@Component({
  selector: 'select[soho-dropdown]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  providers: [ NgModel ],
})
export class SohoDropDownComponent implements AfterViewInit, OnDestroy {
  /**
   * Sets the dropdown to close on selecting a value (helpful for multi-select)
   */
  @Input() closeOnSelect: boolean = true;
  /**
   * Append a css class to the dropdown-list
   */
  @Input() cssClass: string = null;
  /**
   * Typing debounce for search
   */
  @Input() delay: number = 300;
  /**
   * Initialize the empty value
   */
  @Input() empty: boolean = false;
  /**
   * Value of the maximum number of selected elements (must have multiple set to true)
   */
  @Input() maxSelected: number;
  /**
   * Flag to move the selected values to the top of the dropdown
   */
  @Input() moveSelectedToTop: boolean = false;
  /**
   * Sets the select element as a multi-select
   */
  @HostBinding('attr.multiple')
  @Input() multiple: boolean = null;
  /**
   * Name for the dropdown control. Necessary for ngModel to function
   */
  @Input() name: string = `soho-dropdown-${counter++}`;
  /**
   * Flag to remove search functionality from the dropdown
   */
  @Input() noSearch: boolean = false;
  /**
   * Existent as a helper... should use framework's API to get data and
   * then create and pass to the control to use
   */
  @Input() source: Function;

  /**
   * Called when the dropdown value changes
   */
  @Output() change: EventEmitter<Object> = new EventEmitter<Object>();
  /**
   * Called when the dropdown updates in some way
   */
  @Output() updatedEvent: EventEmitter<Object> = new EventEmitter<JQueryEventObject>();

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
  @HostBinding('class.dropdown') get isDropdown() {
    return !this.multiple;
  }
  @HostBinding('class.multiselect') get isMultiSelect() {
    return this.multiple;
  }

  /**
   * Local variables
   */
  private jQueryElement: any;
  private dropdown: any;

  constructor(private element: ElementRef, private model?: NgModel) {
    if (this.model) {
      this.model.valueChanges.subscribe(() => {
        if (this.dropdown) {
          this.dropdown.updated();
        }
      });
    }
  }
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.dropdown({
      closeOnSelect: this.closeOnSelect,
      cssClass: this.cssClass,
      delay: this.delay,
      empty: this.empty,
      maxSelected: this.maxSelected,
      moveSelectedToTop: this.moveSelectedToTop,
      multiple: this.multiple,
      noSearch: this.noSearch,
      source: this.source,
    });

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
      .on('change', (event: JQueryEventObject) => this.onChange(event))
      .on('updated', (event: JQueryEventObject) => this.updatedEvent.emit(event));


    this.dropdown = this.jQueryElement.data('dropdown');
  }
  ngOnDestroy() {
    if (this.dropdown) {
      this.dropdown.destroy();
      this.dropdown = null;
    }
  }
  onChange(event: any) {
    this.change.emit(event);
  }
  /**
   * In case options are being bound asynchronously, you will need to trigger updated on
   * soho dropdown control so it updates its value label
   */
  public updated(): SohoDropDownComponent {
    this.dropdown.updated();
    return this;
  }
}
