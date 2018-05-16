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
  NgZone,
  Self,
  Host,
  Optional,
  InjectionToken,
  forwardRef,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { NgModel, NgControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'select[soho-dropdown]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})
export class SohoDropDownComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  /**
   * Used to provide unnamed controls with a unique id.
   */
  private static counter = 0;
  /**
 * Flag to force an update of the control after the view is created.
 */
  private runUpdatedOnCheck: boolean;

  private valueAccessor: SohoDropDownControlValueAccessorDelegator;

  /**
   * Local variables
   */
  private isDisabled: boolean = null;

  private isReadOnly: boolean = null;

  /**
   * Selector for originating element.
   *
   * @private
   * @type {JQuery}
   * @memberOf SohoDropDownComponent
   */
  private jQueryElement: JQuery;

  /**
   * Reference to the Soho Api.
   */
  private dropdown: SohoDropDownStatic;

  /**
   * Block of options, use the accessors to modify.
   */
  private options: SohoDropDownOptions = {};

  /**
   * Sets the dropdown to close on selecting a value (helpful for multi-select)
   */
  @Input()
  public set closeOnSelect(closeOnSelect: boolean) {
    this.options.closeOnSelect = closeOnSelect;
    if (this.dropdown) {
      this.dropdown.settings.closeOnSelect = closeOnSelect;
      this.dropdown.updated();
    }
  }

  public get closeOnSelect(): boolean {
    return this.options.closeOnSelect;
  }

  /**
   * Append a css class to the dropdown-list
   */
  @Input()
  public set cssClass(cssClass: string) {
    this.options.cssClass = cssClass;
  }

  public get cssClass(): string {
    return this.options.cssClass;
  }

  /**
   * Typing debounce for search
   */
  @Input()
  public set delay(delay: number) {
    this.options.delay = delay;
  }

  public get delay(): number {
    return this.options.delay;
  }

  /**
   * Initialize the empty value
   */
  @Input()
  public set empty(empty: boolean) {
    this.options.empty = empty;
  }

  public get empty(): boolean {
    return this.options.empty;
  }

  /**
   * Value of the maximum number of selected elements (must have multiple set to true)
   */
  @Input()
  public set maxSelected(maxSelected: number) {
    this.options.maxSelected = maxSelected;
  }

  public get maxSelected(): number {
    return this.options.maxSelected;
  }

  /**
   * Flag to move the selected values to the top of the dropdown
   *
   * @deprecated use moveSelected
   */
  @Input()
  public set moveSelectedToTop(moveSelectedToTop: boolean) {
    console.warn(`'moveSelectedToTop' has been deprecated, please use 'moveSelected'.`);
    this.options.moveSelectedToTop = moveSelectedToTop;
  }

  public get moveSelectedToTop(): boolean {
    return this.options.moveSelectedToTop;
  }

  @Input()
  public set moveSelected(moveSelected: SohoDropDownMoveSelectedOptions) {
    this.options.moveSelected = moveSelected;
    if (this.dropdown) {
      this.dropdown.settings.moveSelected = moveSelected;
      this.dropdown.updated();
    }
  }

  public get moveSelected(): SohoDropDownMoveSelectedOptions {
    return this.options.moveSelected;
  }

  @Input()
  public set showEmptyGroupHeaders(showEmptyGroupHeaders: boolean) {
    this.options.showEmptyGroupHeaders = showEmptyGroupHeaders;
    if (this.dropdown) {
      this.dropdown.settings.showEmptyGroupHeaders = showEmptyGroupHeaders;
      this.dropdown.updated();
    }
  }

  public get showEmptyGroupHeaders(): boolean {
    return this.options.showEmptyGroupHeaders;
  }

  @Input()
  public set sourceArguments(sourceArguments: any) {
    this.options.sourceArguments = sourceArguments;
    if (this.dropdown) {
      this.dropdown.settings.sourceArguments = sourceArguments;
      this.dropdown.updated();
    }
  }

  public get sourceArguments(): any {
    return this.options.sourceArguments;
  }

  @Input()
  public set reloadSourceOnOpen(reloadSourceOnOpen: boolean) {
    this.options.reloadSourceOnOpen = reloadSourceOnOpen;
    if (this.dropdown) {
      this.dropdown.settings.reloadSourceOnOpen = reloadSourceOnOpen;
      this.dropdown.updated();
    }
  }

  public get reloadSourceOnOpen(): boolean {
    return this.options.reloadSourceOnOpen;
  }

  /**
   * If set the width of the dropdown is limited to this pixel width.
   * Use 300 for the 300 px size fields. Default is size of the largest data.
   */
  @Input()
  public set maxWidth(maxWidth: number) {
    this.options.maxWidth = maxWidth;
    if (this.dropdown) {
      // @todo this property can not be updated once the control
      // has been initialised.
      this.dropdown.settings.maxWidth = maxWidth;
      this.dropdown.updated();
    }
  }

  public get maxWidth(): number {
    return this.options.maxWidth;
  }

  @Input()
  public set filterMode(filterMode: SohoDropDownFilterModeOptions) {
    this.options.filterMode = filterMode;
    if (this.dropdown) {
      this.dropdown.settings.filterMode = filterMode;
      this.dropdown.updated();
    }
  }

  public get filterMode(): SohoDropDownFilterModeOptions {
    return this.options.filterMode;
  }

  /**
   * Sets the select element as a multi-select
   */
  @Input()
  public set multiple(multiple: boolean) {
    this.options.multiple = multiple;
    if (this.dropdown) {
      this.dropdown.settings.multiple = multiple;
      this.dropdown.updated();
    }
  }

  public get multiple(): boolean {
    return this.options.multiple;
  }

  /**
   * Name for the dropdown control. Necessary for ngModel to function.
   */
  @Input() name = `soho-dropdown-${SohoDropDownComponent.counter++}`;

  /**
   * Flag to add/remove search functionality from the dropdown
   */
  @Input()
  public set noSearch(noSearch: boolean) {
    // Assume any value is true to allow the noSearch attribute to be added
    // without a boolean value.
    const value = noSearch !== null && noSearch as any !== 'false';
    this.options.noSearch = value;
    if (this.dropdown) {
      this.dropdown.settings.noSearch = value;
      this.dropdown.updated();
    }
  }

  public get noSearch(): boolean {
    return this.options.noSearch;
  }

  /**
   * Existent as a helper... should use framework's API to get data and
   * then create and pass to the control to use
   */
  @Input()
  public set source(source: SohoDropDownSourceFunction | Object | string) {
    if (typeof source === 'function') {
      this.options.source = (...args) => {
       this.ngZone.run(() => (source as Function)(...args));
      };
    } else {
      this.options.source = source;
    }
  }

  public get source(): SohoDropDownSourceFunction | Object | string {
    return this.options.source;
  }

  /**
   * Initialize the showSelectAll value for multi-select drop downs
   */
  @Input()
  public set showSelectAll(selectAll: boolean) {
    this.options.showSelectAll = selectAll;
  }

  public get showSelectAll(): boolean {
    return this.options.showSelectAll;
  }

  /**
   * Called when the dropdown value changes
   */
  @Output()
  change: EventEmitter<JQuery.Event> = new EventEmitter<JQuery.Event>();

  /**
   * Called when the dropdown updates in some way.
   */
  @Output('updated') // tslint:disable-line
  updatedEvent: EventEmitter<Object> = new EventEmitter<JQuery.Event>();

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

  @HostBinding('attr.multiple') get isMultiple() {
    return this.options.multiple;
  }

  @HostBinding('class.dropdown') get isDropdown(): boolean {
    return !this.options.multiple;
  }

  @HostBinding('class.multiselect') get isMultiSelect() {
    return this.options.multiple;
  }

  /**
   * Creates an instance of SohoDropDownComponent.
   * @param {ElementRef} element the element this component encapsultes.
   * @param {NgZone} ngZone
   * @param {NgControl} ngControl
   * @memberof SohoDropDownComponent
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    @Self() @Optional() public ngControl: NgControl) {

      // Is the control using a form control and/or model?
    if (this.ngControl) {
      // Wrap the accessor to allow updates to be pushed,
      // but also use the standard accessors provided by angular.
      this.valueAccessor = new SohoDropDownControlValueAccessorDelegator(this.ngControl.valueAccessor, this);

      // ... change the accessor to use ours.
      this.ngControl.valueAccessor = this.valueAccessor;
    }
  }

  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);

      // initialise the dropdown control
      this.jQueryElement.dropdown(this.options);

      // extract the api
      this.dropdown = this.jQueryElement.data('dropdown');

      // @todo - add event binding control so we don't bind if not required.
      this.jQueryElement
        .on('change', (event: JQuery.Event) => this.onChange(event))
        .on('updated', (event: JQuery.Event) => this.onUpdated(event))
        .on('requestend', (event: JQuery.Event, data: any) => this.onRequestEnd(event, data));

      this.runUpdatedOnCheck = true;
    });
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one).
        setTimeout(() => {
          this.updated();
        });
        this.runUpdatedOnCheck = false;
      });
    }
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
      }

      // Destroy any widget resources.
      this.dropdown.destroy();
      this.dropdown = null;
    });
  }

  /**
   * Event handler for the 'requestend' event on the dropdown 'component'.
   *
   * @private
   * @param {JQuery.Event} event the standard jQuery event.
   * @param {*} data any data passed by the dropdown (todo the type)
   * @memberof SohoDropDownComponent
   */
  private onRequestEnd(event: JQuery.Event, data: any) {

    // When the request for data has completed, make sure we
    // let the model know, by using the value accessor.
    // Make sure calls to angular are made in the right zone.
    this.ngZone.run(() => {
      // This may be the string representation of the data,
      // in which case we need to convert to real data!
      this.valueAccessor.writeValue(this.jQueryElement.val());
      this.valueAccessor.onChangeFn(this.valueAccessor.value);
    });
  }

  private onUpdated(event: JQuery.Event) {
    const val = this.jQueryElement.val();
    this.ngZone.run(() => {
      this.valueAccessor.writeValue(val);
      this.valueAccessor.onChangeFn(this.valueAccessor.value);

      this.updatedEvent.next(event);
    });
  }

  /**
   * Event handler for the 'changed' event on the dropdown component.
   *
   * @private
   * @param {*} event the standard jQuery event.
   * @memberof SohoDropDownComponent
   */
  private onChange(event: any) {
    const val = this.jQueryElement.val();
    console.log(`onChange(${JSON.stringify(val)})`);
    // Make sure calls to angular are made in the right zone.
    this.ngZone.run(() => {
      // Update the model and fires any change detection.
      this.valueAccessor.writeValue(val);
      this.valueAccessor.onChangeFn(this.valueAccessor.value);

      // Set the data on the event.
      event.data = this.valueAccessor.value;

      // Inform all listeners.
      this.change.emit(event);
    });
  }

  /**
   * In case options are being bound asynchronously, you will need to trigger updated on
   * soho dropdown control so it updates its value labels.
   */
  public updated(): SohoDropDownComponent {
    if (this.dropdown) {
      this.ngZone.runOutsideAngular(() => {
        this.dropdown.selectValue(this.jQueryElement.val());
        this.dropdown.updated();
      });
    }
    return this;
  }

  // -------------------------------------------
  // Component Input
  // -------------------------------------------
  /**
   * @param disabled
   */
  @Input() set disabled(value: boolean) {
    if (this.dropdown) {
      if (value) {
        this.ngZone.runOutsideAngular(() => { this.dropdown.disable(); });
        this.isDisabled = true;
      } else {
        this.ngZone.runOutsideAngular(() => { this.dropdown.enable(); });
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * @param readonly
   */
  @Input() set readonly(value: boolean) {
    if (this.dropdown) {
      if (value) {
        this.dropdown.readonly();
        this.isReadOnly = true;
      } else {
        this.dropdown.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * @description
   *
   * Soho-dropdown is not a native element - need this to set focus programmatically.
   * 'name' attribute must be set on the control for this to work correctly.
   */
  public setFocus(): void {
    if (this.jQueryElement) {
      this.ngZone.runOutsideAngular(() => {
        this.jQueryElement.trigger('activated');
      });
    }
  }

  /**
   * @description
   *
   * Sets the value of the dropdown.
   *
   * This is the model value that is to be set.
   * @param value
   */
  public selectValue(value: any): void {
    if (this.dropdown) {
      this.ngZone.runOutsideAngular(() => {
        this.dropdown.selectValue(value);
      });
    }
  }
}

/**
 * Provides a 'wrapper' around the {ControlValueAccessor} added by
 * angular when handling `select` elements.
 *
 * This class allows the {SohoDropDownComponent} to interoperate with
 * the {ControlValueAccessor}.  Specifically, providing access to the
 * onChange function, which we must call when the value of the dropdown
 * is modified.
 *
 * @class IdsDropDownControlValueAccessor
 * @implements {ControlValueAccessor}
 */
class SohoDropDownControlValueAccessorDelegator implements ControlValueAccessor {
  /**
   * Current value.
   *
   * @type {*}
   * @memberof SohoDropDownControlValueAccessorDelegator
   */
  public value: any;
  /**
   * The Function to call when the value of the control changes.
   */
  public onChangeFn: Function;

  /**
   * Creates an instance of SohoDropDownControlValueAccessorDelegate.
   *
   * @param {ControlValueAccessor} delegate the value accessor
   * @param {SohoDropDownComponent} dropdown the dropdown linked to the accessor
   * @memberof SohoDropDownControlValueAccessorDelegate
   */
  constructor(
    private delegate: ControlValueAccessor,
    private dropdown: SohoDropDownComponent) { }

  writeValue(value: any): void {
    console.log(`writeValue ${JSON.stringify(value)}`);
    this.delegate.writeValue(value);

    // Get the actual value back from the
    // delegate.
    this.value = (this.delegate as any).value;
    console.log(`${JSON.stringify(this.value)}`);
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
    this.delegate.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.delegate.registerOnTouched(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.delegate.setDisabledState(isDisabled);
  }
}
