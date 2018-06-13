import {
  AfterViewInit,
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
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  NgModel,
  NgControl,
  ControlValueAccessor
} from '@angular/forms';

@Component({
  selector: 'select[soho-dropdown]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
    this.options.source = source;
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
   * @param {ElementRef} element the element this component encapsulates.
   * @param {NgZone} ngZone the angualar zone for this component
   * @param {NgControl} ngControl any associated form control (optional)
   * @memberof SohoDropDownComponent
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    @Self() @Optional() public ngControl: NgControl,
    public ref: ChangeDetectorRef) {

    // Is the control using a form control and/or ngModel?
    if (this.ngControl) {
      // Wrap the accessor to allow updates to be pushed,
      // but also use the standard accessors provided by angular.
      this.valueAccessor =
        new SohoDropDownControlValueAccessorDelegator( // tslint:disable-line
          this.ngControl.valueAccessor, this);

      // ... change the accessor on the control to use ours.
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
        .on('change', (event: JQuery.Event) => this.onChanged(event))
        .on('updated', (event: JQuery.Event) => this.onUpdated(event))
        .on('requestend', (event: JQuery.Event, searchTerm: string, data: any[]) => this.onRequestEnd(event, searchTerm, data));

      this.runUpdatedOnCheck = true;
    });
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        setTimeout(() => this.updated() );
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
  private onRequestEnd(event: JQuery.Event, searchTerm: string, data: any[]) {
    // When the request for data has completed, make sure we
    // update the 'dropdown' control.
    this.ngZone.run(() => {
      this.ref.markForCheck();
    });

  }

  private onUpdated(event: JQuery.Event) {
    // Fire the event, in the angular zone.
    this.ngZone.run(() => this.updatedEvent.next(event) );
  }

  /**
   * Event handler for the 'changed' event on the 'dropdown' component.
   *
   * @private
   * @param {*} event the standard jQuery event.
   * @memberof SohoDropDownComponent
   */
  private onChanged(event: any) {
    // This code does not work properly if run in the angular zone.
    NgZone.assertNotInAngularZone();

    // Retrieve the value from the 'dropdown' component.
    const val = this.jQueryElement.val();

    // This value needs to be converted into an options value, which is
    // generated by the {SelectControlValueAccessor}.
    const optionValue = this.valueAccessor.convertToOptionValue(val);

    // Make sure calls to angular are made in the right zone.
    this.ngZone.run(() => {
      // ... update the model (which will fire change
      // detection if required).
      this.valueAccessor.onChangeFn(optionValue);

      // @todo - this wants to be the real value, so we may need to look
      // that up.
      event.data = val;
      this.change.emit(event);
    });
  }

  /**
   * In case options are being bound asynchronously, you will need to trigger updated on
   * soho dropdown control so it updates its value labels.
   */
  public updated(): SohoDropDownComponent {
    if (this.dropdown) {
      // Calling updated when an item is selected, looses the selection!
      this.ngZone.runOutsideAngular( () => this.dropdown.updated() );
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
        this.ngZone.runOutsideAngular(() => this.dropdown.disable());
        this.isDisabled = true;
      } else {
        this.ngZone.runOutsideAngular(() => this.dropdown.enable());
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
        this.ngZone.runOutsideAngular(() => this.dropdown.readonly());
        this.isReadOnly = true;
      } else {
        this.ngZone.runOutsideAngular(() => this.dropdown.enable());
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
   * @todo this may need to involve mapping from actual value
   * if ngModel is used.
   *
   * This is the model value that is to be set.
   * @param value - the internal value to select
   */
  public selectValue(value: any): void {
    if (this.dropdown) {
      this.ngZone.runOutsideAngular(() => {
        this.dropdown.selectValue(value);
      });
    }
  }

   /**
   * Marks the components as requiring a rebuild after the next update.
   */
  markForRefresh() {
    // Run updated on the next updated check.
    this.runUpdatedOnCheck = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.ref.markForCheck();
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
 * It also exposes the encoding used storing complex objects as
 * values in the 'option' elements.
 *
 * See https://github.com/angular/angular/blob/master/packages/forms/src/directives/select_multiple_control_value_accessor.ts.
 *
 * @class SohoDropDownControlValueAccessorDelegator
 * @implements {ControlValueAccessor}
 */
class SohoDropDownControlValueAccessorDelegator implements ControlValueAccessor {
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
    // Just pass it on.
    this.delegate.writeValue(value);

    // @todo reduce the number of calls to this!
    this.dropdown.markForRefresh();
  }

  registerOnChange(fn: any): void {
    // Keep a reference to the change function, then we an call it.
    this.onChangeFn = fn;

    // Give the delegate a chance to store this too.
    this.delegate.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.delegate.registerOnTouched(fn);
  }

  /**
   * Update the jQuery widget with the request disabled state.
   *
   * @param {boolean} isDisabled true if the control should be disabled; otherwise false.
   * @memberof SohoDropDownControlValueAccessorDelegator
   */
  setDisabledState(isDisabled: boolean): void {
    this.dropdown.disabled = isDisabled;
    this.delegate.setDisabledState(isDisabled);
  }

  /**
   * Convert the 'real' value into the corresponding
   * option value.
   *
   * @private
   * @param {*} value the value of the option; must not be null.
   * @returns {string} the string optipnValue of the otion elemen.
   * @memberof SohoDropDownControlValueAccessorDelegator
   */
  convertToOptionValue(value: any): string {
    const delegate = (this.delegate as any);
    const id = delegate._getOptionId(value);
    return this.buildValueString(id, value);
  }

  /**
   * Copy of the "valuestring" builder used by the Angular
   * Select and MultiSelect
   * @param id option id (ordinal)
   * @param value the actual value
   */
  private buildValueString(id, value) {
    if (id == null) {
      return '' + value;
    }
    if (typeof value === 'string') {
      value = '\'' + value + '\'';
    }

    if (value && typeof value === 'object') {
      value = 'Object';
    }
    return (id + ': ' + value).slice(0, 50);
  }
}
