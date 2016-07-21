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
  moduleId: module.id,
  selector: 'select[soho-dropdown]',
  template: '<ng-content></ng-content>'
})
export class SoHoDropdownComponent implements AfterViewInit, OnDestroy {
  /**
   * Assign the id for the control
   * (maps to the name to use on a label's 'for' attribute)
   */
  @HostBinding('id')
  @Input('soho-dropdown') id: string = null; // tslint:disable-line
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
  @Output() updated: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Bind attributes to the host select element
   */
  @HostBinding('name') get name() {
    return this.id;
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

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    // TODO: Figure out what element to send to jQuery to init the dropdown
    this.jQueryElement = jQuery(this.element.nativeElement);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.bind('change', () => { this.change.emit(null); });
    this.jQueryElement.bind('updated', () => { this.updated.emit(null); });

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
    this.dropdown = this.jQueryElement.data('dropdown');
  }
  ngOnDestroy() {
    this.dropdown.destroy();
  }
  get value(): Array<string> {
    if (!this.element.nativeElement) {
      return;
    }
    const array = [].slice.call((<HTMLSelectElement>this.element.nativeElement).options);
    return (<Array<HTMLOptionElement>>array).filter((option: HTMLOptionElement) => {
      return option.selected;
    }).map(option => {
      return option.value;
    });
  }
}
