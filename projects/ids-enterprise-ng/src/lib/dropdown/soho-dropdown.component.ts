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
  Optional,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  NgControl,
  ControlValueAccessor
} from '@angular/forms';

/**
 * Angular wrapper for the `dropdown` widget in the ids-enterprise controls.
 */
@Component({
  selector: 'select[soho-dropdown]', // eslint-disable-line
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
  private runUpdatedOnCheck?: boolean;

  /**
   * Integration with the Angular ControlValueAccessor for form controls.
   */
  private valueAccessor?: SohoDropDownControlValueAccessorDelegator;

  /**
   * Selector for originating element.
   */
  private jQueryElement?: JQuery;

  /**
   * Reference to the IDS Enterprise Api.
   */
  private dropdown?: SohoDropDownStatic | null;

  /**
   * Default block of options, use the accessors to modify.
   */
  private options: SohoDropDownOptions = {
    reload: 'none'
  };

  private isReadOnly?: boolean = undefined;

  /**
   * Sets the dropdown to close on selecting a value (helpful for multi-select)
   */
  @Input()
  public set closeOnSelect(closeOnSelect: boolean | undefined) {
    this.options.closeOnSelect = closeOnSelect;
    if (this.dropdown) {
      this.dropdown.settings.closeOnSelect = closeOnSelect;
      this.markForRefresh();
    }
  }

  public get closeOnSelect(): boolean | undefined {
    return this.options.closeOnSelect;
  }

  /**
   * Append a css class to the dropdown-list
   */
  @Input()
  public set cssClass(cssClass: string | undefined) {
    this.options.cssClass = cssClass;
  }

  public get cssClass(): string | undefined {
    return this.options.cssClass;
  }

  /**
   * Typing debounce for search
   */
  @Input()
  public set delay(delay: number | undefined) {
    this.options.delay = delay;
  }

  public get delay(): number | undefined {
    return this.options.delay;
  }

  /**
   * Initialize the empty value
   */
  @Input()
  public set empty(empty: boolean | undefined) {
    this.options.empty = empty;
  }

  public get empty(): boolean | undefined {
    return this.options.empty;
  }

  /**
   * Value of the maximum number of selected elements (must have multiple set to true)
   */
  @Input()
  public set maxSelected(maxSelected: number | undefined) {
    this.options.maxSelected = maxSelected;
  }

  public get maxSelected(): number | undefined {
    return this.options.maxSelected;
  }

  /**
   * Flag to move the selected values to the top of the dropdown
   *
   * @deprecated use moveSelected
   */
  @Input()
  public set moveSelectedToTop(moveSelectedToTop: boolean | undefined) {
    console.warn(`'moveSelectedToTop' has been deprecated, please use 'moveSelected'.`);
    this.options.moveSelectedToTop = moveSelectedToTop;  // eslint-disable-line
  }

  public get moveSelectedToTop(): boolean | undefined {
    return this.options.moveSelectedToTop;
  }

  @Input()
  public set moveSelected(moveSelected: SohoDropDownMoveSelectedOptions | undefined) {
    this.options.moveSelected = moveSelected;
    if (this.dropdown) {
      this.dropdown.settings.moveSelected = moveSelected;
      this.markForRefresh();
    }
  }

  public get moveSelected(): SohoDropDownMoveSelectedOptions | undefined {
    return this.options.moveSelected;
  }

  @Input()
  public set showEmptyGroupHeaders(showEmptyGroupHeaders: boolean | undefined) {
    this.options.showEmptyGroupHeaders = showEmptyGroupHeaders;
    if (this.dropdown) {
      this.dropdown.settings.showEmptyGroupHeaders = showEmptyGroupHeaders;
      this.markForRefresh();
    }
  }

  public get showEmptyGroupHeaders(): boolean | undefined {
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

  /**
   * Determines the frequency of reloading data from an external source
   */
  @Input()
  public set reload(reload: SohoDropDownReloadStyles) {
    this.options.reload = reload;
    if (this.dropdown) {
      this.dropdown.settings.reload = reload;
      this.markForRefresh();
    }
  }

  public get reload(): SohoDropDownReloadStyles {
    return this.options.reload;
  }

  /**
   * If set the width of the dropdown is limited to this pixel width.
   * Use 300 for the 300 px size fields. Default is size of the largest data.
   */
  @Input()
  public set maxWidth(maxWidth: number | undefined) {
    this.options.maxWidth = maxWidth;
    if (this.dropdown) {
      // @todo this property can not be updated once the control
      // has been initialised.
      this.dropdown.settings.maxWidth = maxWidth;
      this.markForRefresh();
    }
  }

  public get maxWidth(): number | undefined {
    return this.options.maxWidth;
  }

  /**
   * Sets the exact width of the open list, by default its the size of the field
   */
  @Input()
  public set width(width: number | undefined) {
    this.options.width = width;
    if (this.dropdown) {
      this.dropdown.settings.width = width;
      this.markForRefresh();
    }
  }

  public get width(): number | undefined {
    return this.options.width;
  }

  @Input()
  public set filterMode(filterMode: SohoDropDownFilterModeOptions | undefined) {
    this.options.filterMode = filterMode;
    if (this.dropdown) {
      this.dropdown.settings.filterMode = filterMode;
      this.markForRefresh();
    }
  }

  public get filterMode(): SohoDropDownFilterModeOptions | undefined {
    return this.options.filterMode;
  }

  @Input()
  public set virtualScroll(virtualScroll: boolean | undefined) {
    this.options.virtualScroll = virtualScroll;
    if (this.dropdown) {
      this.dropdown.settings.virtualScroll = virtualScroll;
      this.markForRefresh();
    }
  }

  public get virtualScroll(): boolean | undefined {
    return this.options.virtualScroll;
  }

  /**
   * Sets the select element as a multi-select
   */
  @Input()
  public set multiple(multiple: boolean | undefined) {
    this.options.multiple = multiple;
    if (this.dropdown) {
      this.dropdown.settings.multiple = multiple;
      this.markForRefresh();
    }
  }

  public get multiple(): boolean | undefined {
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
  public set noSearch(noSearch: boolean | undefined) {
    // Assume any value is true to allow the noSearch attribute to be added
    // without a boolean value.
    const value = noSearch !== null && noSearch as any !== 'false';
    this.options.noSearch = value;
    if (this.dropdown) {
      this.dropdown.settings.noSearch = value;
      this.markForRefresh();
    }
  }

  public get noSearch(): boolean | undefined {
    return this.options.noSearch;
  }

  /**
   * Existent as a helper... should use framework's API to get data and
   * then create and pass to the control to use
   */
  @Input()
  public set source(source: SohoDropDownSourceFunction | Object | string | undefined) {
    this.options.source = source;
  }

  public get source(): SohoDropDownSourceFunction | Object | string | undefined {
    return this.options.source;
  }

  /**
   * Initialize the showSelectAll value for multi-select drop downs
   */
  @Input()
  public set showSelectAll(selectAll: boolean | undefined) {
    this.options.showSelectAll = selectAll;
  }

  public get showSelectAll(): boolean | undefined {
    return this.options.showSelectAll;
  }

  /**
   * Initialize the showTags value for multi-select drop downs
   */
  @Input()
  public set showTags(showTags: boolean | undefined) {
    this.options.showTags = showTags;
  }

  public get showTags(): boolean | undefined {
    return this.options.showTags;
  }

  /**
   * If true, moves the Searchfield in the Dropdown list from directly on top of the pseudo-lement
   * to underneath/above, providing visibility into the currently selected results.
   */
  @Input()
  public set showSearchUnderSelected(showSearchUnderSelected: boolean | undefined) {
    this.options.showSearchUnderSelected = showSearchUnderSelected;
  }

  public get showSearchUnderSelected(): boolean | undefined {
    return this.options.showSearchUnderSelected;
  }

  /**
   * If defined, passes along 'clickHandler' and 'dismissHandler' functions to any Tags
   */
  @Input()
  public set tagSettings(tagSettings: any) {
    this.options.tagSettings = tagSettings;
  }

  public get tagSettings(): any {
    return this.options.tagSettings;
  }

  /**
   * If defined, passes along 'clickHandler' and 'dismissHandler' functions to any Tags
   */
  @Input()
  public set allTextString(allTextString: string | undefined) {
    this.options.allTextString = allTextString;
  }

  public get allTextString(): string | undefined {
    return this.options.allTextString;
  }

  /**
   * @param appendTo additional classes
   */
  @Input() set appendTo(appendTo: string) {
    this.options.appendTo = appendTo;
  }

  /**Custom text string for `Selected` text header use in MultiSelect */
  @Input()
  public set selectedTextString(selectedTextString: string) {
    this.options.selectedTextString = selectedTextString;
  }

  public get selectedTextString(): string {
    return this.options.tagSettings;
  }

  @Input()
  public set attributes(attributes: Array<Object> | Object | undefined) {
    this.options.attributes = attributes;
  }

  public get attributes(): Array<Object> | Object | undefined {
    return this.options.attributes;
  }

  /**
   * Called when the dropdown value changes
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('change') change$ = new EventEmitter<JQuery.TriggeredEvent>();

  /**
   * Called when the dropdown updates in some way.
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('updated')
  updated$ = new EventEmitter<JQuery.TriggeredEvent>();

  /**
   * Fired when the dropdown list is closed.
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('listclosed')
  listClosed$ = new EventEmitter<SohoDropDownEvent>();

  /**
   * Fired when the dropdown list is opened.
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('listopened')
  listOpened$ = new EventEmitter<SohoDropDownEvent>();

  /**
   * This event is fired when a key is pressed
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('keydown') keydown$ = new EventEmitter<Event>();

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

  @Input()
  public set readonly(readonly: boolean | undefined) {
    this.isReadOnly = readonly;
    if (this.dropdown) {
      if (readonly) {
        this.dropdown.readonly();
      } else if (readonly === false) {
        this.dropdown.enable();
      }
    }
  }

  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  /**
   * Creates an instance of SohoDropDownComponent.
   *
   * @param element the element this component encapsulates.
   * @param ngZone the angular zone for this component
   * @param ngControl any associated form control (optional)
   * @param ref the change detector reference, must not be null.
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
        new SohoDropDownControlValueAccessorDelegator((this.ngControl.valueAccessor as any), this);

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

      this.options.onKeyDown = (e: Event) => this.ngZone.run(() => this.keydown$.next(e));

      // initialise the dropdown control
      this.jQueryElement.dropdown(this.options);

      // extract the api
      this.dropdown = this.jQueryElement.data('dropdown');

      // @todo - add event binding control so we don't bind if not required.
      this.jQueryElement
        .on('change', (event: JQuery.TriggeredEvent) => this.onChanged(event))
        .on('updated', (event: JQuery.TriggeredEvent) => this.onUpdated(event))
        .on('requestend', (event: JQuery.TriggeredEvent, searchTerm: string, data: any[]) => this.onRequestEnd(event, searchTerm, data))
        .on('listclosed', (event: JQuery.TriggeredEvent, action: SohoDropDownEventActions) => this.onListClosed(event, action))
        .on('listopened', (event: JQuery.TriggeredEvent) => this.onListOpened(event));

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
        setTimeout(() => this.updated());

        if (this.readonly) {
          this.dropdown?.readonly();
        } else if (this.readonly === false) {
          this.dropdown?.enable();
        }

        this.runUpdatedOnCheck = false;
      });
    }
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }

      // Destroy any widget resources.
      this.dropdown?.destroy();
      this.dropdown = null;
    });
  }

  /**
   * Event handler for the 'requestend' event on the dropdown 'component'.
   *
   *
   * @param event the standard jQuery event.
   * @param data any data passed by the dropdown (todo the type)
   *
   */
  private onRequestEnd(_event: JQuery.TriggeredEvent, _searchTerm: string, _data: any[]) {
    // When the request for data has completed, make sure we
    // update the 'dropdown' control.
    this.ngZone.run(() => {
      this.ref.markForCheck();
    });

  }

  private onUpdated(event: JQuery.TriggeredEvent) {
    // Fire the event, in the angular zone.
    this.ngZone.run(() => this.updated$.next(event));
  }

  /**
   * Event handler for the 'changed' event on the 'dropdown' component.
   *
   *
   * @param event the standard jQuery event.
   *
   */
  private onChanged(event: any) {
    // Retrieve the value from the 'dropdown' component.
    const val = this.jQueryElement?.val();

    this.ngZone.run(() => {
      // This value needs to be converted into an options value, which is
      // generated by the {SelectControlValueAccessor}.
      if (this.valueAccessor) {
        const optionValue = this.valueAccessor.convertToOptionValue(val);

        // Make sure calls to angular are made in the right zone.
        // ... update the model (which will fire change
        // detection if required).
        if (this.valueAccessor && this.valueAccessor.onChangeFn) {
          this.valueAccessor.onChangeFn(optionValue);
        }
      }

      // @todo - this wants to be the real value, so we may need to look
      // that up.
      event.data = val;
      this.change$.emit(event);
    });
  }

  /**
   * Handles the 'listopened' event triggered by the underlying jQuery control.
   *
   * @param event the fired event.
   */
  private onListOpened(event: SohoDropDownEvent): void {
    this.ngZone.run(() => {
      this.listOpened$.emit(event);
    });
  }

  /**
   * Handles the 'listclosed' event triggered by the underlying jQuery control.
   *
   * @param event the fired event.
   */
  private onListClosed(event: SohoDropDownEvent, action: SohoDropDownEventActions): void {
    this.ngZone.run(() => {
      // Make sure the event is fixed up for dispatch
      event.action = action;
      this.listClosed$.emit(event);
    });
  }

  /**
   * In case options are being bound asynchronously, you will need to trigger updated on
   * soho dropdown control so it updates its value labels.
   */
  public updated(): SohoDropDownComponent {
    if (this.dropdown) {
      // Calling updated when an item is selected, loses the selection!
      this.ngZone.runOutsideAngular(() => this.dropdown?.updated());
    }
    return this;
  }

  // -------------------------------------------
  // Component Input
  // -------------------------------------------

  @Input() set disabled(value: boolean) {
    if (this.dropdown) {
      if (value) {
        this.ngZone.runOutsideAngular(() => this.dropdown?.disable());
      } else {
        this.ngZone.runOutsideAngular(() => this.dropdown?.enable());
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
        this.jQueryElement?.trigger('activated');
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
        this.dropdown?.selectValue(value);
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
 *
 *
 */
class SohoDropDownControlValueAccessorDelegator implements ControlValueAccessor {
  /**
   * The Function to call when the value of the control changes.
   */
  public onChangeFn?: Function;

  /**
   * Creates an instance of SohoDropDownControlValueAccessorDelegate.
   *
   * @param delegate the value accessor
   * @param dropdown the dropdown linked to the accessor
   *
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
   * @param isDisabled true if the control should be disabled; otherwise false.
   *
   */
  setDisabledState(isDisabled: boolean): void {
    this.dropdown.disabled = isDisabled;

    if (this.delegate.setDisabledState) {
      this.delegate.setDisabledState(isDisabled);
    }
  }

  /**
   * Convert the 'real' value into the corresponding
   * option value.
   *
   *
   * @param value the value of the option; must not be null.
   * @returns the string optipnValue of the otion elemen.
   *
   */
  convertToOptionValue(value: any): string {
    const delegate = (this.delegate as any);
    const id = delegate._getOptionId(value);
    return this.buildValueString(id, value);
  }

  /**
   * Copy of the "valuestring" builder used by the Angular
   * Select and MultiSelect
   *
   * @param id option id (ordinal)
   * @param value the actual value
   */
  private buildValueString(id: any, value: any) {
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
