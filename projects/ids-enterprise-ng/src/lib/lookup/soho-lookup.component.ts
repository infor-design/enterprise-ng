import {
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils';

@Component({
  selector: 'input[soho-lookup]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoLookupComponent)]
})
export class SohoLookupComponent extends BaseControlValueAccessor<any> implements AfterViewInit, AfterViewChecked, OnDestroy {
  /**
   * Used to call updated from the afterViewChecked lifecycle event.
   */
  private updateRequired?: boolean;

  /**
   * API for interacting with modal and then in turn the buttons on the dialog.
   */
  modal?: SohoModalStatic;

  /**
   * Available Soho Template control settings as Inputs
   * Should match the Soho properties for the component
   */
  @Input() asobject = false; // set to false for backwards compatibility

  /** Grid columns. */
  @Input() columns?: SohoDataGridColumn[];

  /**
   * Changes the dataset being used
   */
  @Input() public set dataset(data: Object[] | undefined) {
    if (!data) {
      return;
    }

    this._dataset = data;
    if (data && this.jQueryElement && this.lookup?.settings?.options) {
      this.lookup.settings.options.dataset = data;
      this.markForUpdate();
    }
  }
  public get dataset(): Object[] | undefined {
    return this._dataset;
  }

  /** Custom click event; can be used with a modal dialog and custom list component */
  @Input() public set click(value: SohoLookupClickFunction | undefined) {
    this.settings.click = value;
    if (this.lookup) {
      this.lookup.settings.click = this.settings.click;
      this.markForUpdate();
    }
  }
  public get click(): SohoLookupClickFunction | undefined {
    return this.settings.click;
  }

  /** If a click method is defined, this flexible object can be passed in. */
  @Input() public set clickArguments(value: any) {
    this.settings.clickArguments = value;
    if (this.lookup) {
      this.lookup.settings.clickArguments = this.settings.clickArguments;
      this.markForUpdate();
    }
  }
  public get clickArguments() {
    return this.settings.clickArguments;
  }

  /** Custom clear event; can be used with a modal dialog and custom list component */
  @Input() public set clear(value: SohoLookupClearFunction | undefined) {
    this.settings.clear = value;
    if (this.lookup) {
      this.lookup.settings.clear = this.settings.clear;
      this.markForUpdate();
    }
  }
  public get clear(): SohoLookupClearFunction | undefined {
    return this.settings.clear;
  }

  /** If a clear method is defined, this flexible object can be passed in. */
  @Input() public set clearArguments(value: any) {
    this.settings.clearArguments = value;
    if (this.lookup) {
      this.lookup.settings.clearArguments = this.settings.clearArguments;
      this.markForUpdate();
    }
  }
  public get clearArguments() {
    return this.settings.clearArguments;
  }

  /** Field to return from the array or can be a function. */
  @Input() public set field(value: string | SohoLookupFieldFunction | undefined) {
    this.settings.field = value;
    if (this.lookup) {
      this.lookup.settings.field = this.settings.field;
      this.markForUpdate();
    }
  }
  public get field(): string | SohoLookupFieldFunction | undefined {
    return this.settings.field;
  }

  /** Dialog title or takes the label + Lookup. */
  @Input() public set title(value: string | undefined) {
    this.settings.title = value;
    if (this.lookup) {
      this.lookup.settings.title = this.settings.title;
      this.markForUpdate();
    }
  }
  public get title(): string | undefined {
    return this.settings.title;
  }

  /** Swap out the lookup id for any other icon in the icon set by name */
  @Input() public set icon(value: string | undefined) {
    this.settings.icon = value;
    if (this.lookup) {
      this.lookup.settings.icon = this.settings.icon;
      this.markForUpdate();
    }
  }
  public get icon(): string | undefined {
    return this.settings.icon;
  }

  /** Pass dialog buttons or Cancel / Apply. */
  @Input() public set buttons(value: SohoModalButton[] | undefined) {
    this.settings.buttons = value;
    if (this.lookup) {
      this.lookup.settings.buttons = this.settings.buttons;
      this.markForUpdate();
    }
  }
  public get buttons(): SohoModalButton[] | undefined {
    return this.settings.buttons;
  }

  /** Options to pass to the underlying data grid. */
  @Input() public set options(value: SohoDataGridOptions | undefined) {
    this.settings.options = value;
    if (this.lookup) {
      this.lookup.settings.options = this.settings.options;
      this.markForUpdate();
    }
  }
  public get options(): SohoDataGridOptions | undefined {
    return this.settings.options;
  }

  /**
   * Used to manage data prior to showing the lookup.
   *
   * For example:
   *  - When the button is clicked, show a loading dialog and make the request for
   *    lookup grid data.
   *  - Upon receiving grid data, set lookup.settings.options for the columns and dataset.
   *  - Then call grid() to build the grid and complete the lookup call.
   */
  @Input() public set beforeShow(value: SohoLookupBeforeShowFunction | undefined) {
    this.settings.beforeShow = value;
    if (this.lookup) {
      this.lookup.settings.beforeShow = this.settings.beforeShow;
      this.markForUpdate();
    }
  }
  public get beforeShow(): SohoLookupBeforeShowFunction | undefined {
    return this.settings.beforeShow;
  }

  /** Custom modal content. */
  @Input() public set modalContent(value: JQuery | string | undefined) {
    this.settings.modalContent = value;
    if (this.lookup) {
      this.lookup.settings.modalContent = this.settings.modalContent;
      this.markForUpdate();
    }
  }
  public get modalContent(): JQuery | string | undefined {
    return this.settings.modalContent;
  }

  /** Can the user type random text into the field. */
  @Input() public set editable(value: boolean | undefined) {
    this.settings.editable = value;
    if (this.lookup) {
      this.lookup.settings.editable = this.settings.editable;
      this.markForUpdate();
    }
  }
  public get editable(): boolean | undefined {
    return this.settings.editable;
  }

  /** If set to false the dialog wont apply the value on clicking a value. */
  @Input() public set autoApply(value: boolean | undefined) {
    this.settings.autoApply = value;
    if (this.lookup) {
      this.lookup.settings.autoApply = this.settings.autoApply;
      this.markForUpdate();
    }
  }
  public get autoApply(): boolean | undefined {
    return this.settings.autoApply;
  }

  /** Function used to match the search term to the data. */
  @Input() public set match(value: SohoDataGridMatchFunction | undefined) {
    this.settings.match = value;
    if (this.lookup) {
      this.lookup.settings.match = this.settings.match;
      this.markForUpdate();
    }
  }
  public get match(): SohoDataGridMatchFunction | undefined {
    return this.settings.match;
  }

  /** A function that fires to let you validate form items on open and select. */
  @Input() public set validator(value: SohoLookupValidatorFunction | undefined) {
    this.settings.validator = value;
    if (this.lookup) {
      this.lookup.settings.validator = this.settings.validator;
      this.markForUpdate();
    }
  }
  public get validator(): SohoLookupValidatorFunction | undefined {
    return this.settings.validator;
  }

  /** Set the width of the input to the width of the selection */
  @Input() public set autoWidth(value: boolean | undefined) {
    this.settings.autoWidth = value;
    if (this.lookup) {
      this.lookup.settings.autoWidth = this.settings.autoWidth;
      this.markForUpdate();
    }
  }
  public get autoWidth(): boolean | undefined {
    return this.settings.autoWidth;
  }

  /** The character  used to separate data strings */
  @Input() public set delimiter(value: string | undefined) {
    this.settings.delimiter = value;
    if (this.lookup) {
      this.lookup.settings.delimiter = this.settings.delimiter;
      this.markForUpdate();
    }
  }
  public get delimiter(): string | undefined {
    return this.settings.delimiter;
  }

  /** Apply a minimum width to the lookup*/
  @Input() public set minWidth(value: number | undefined) {
    this.settings.minWidth = value;
    if (this.lookup) {
      this.lookup.settings.minWidth = this.settings.minWidth;
      this.markForUpdate();
    }
  }
  public get minWidth(): number | undefined {
    return this.settings.minWidth;
  }

  /**  Add an ability to clear the lookup field with an x */
  @Input() public set clearable(value: boolean | undefined) {
    this.settings.clearable = value;
    if (this.lookup) {
      this.lookup.settings.clearable = this.settings.clearable;
      this.markForUpdate();
    }
  }
  public get clearable(): boolean | undefined {
    return this.settings.clearable;
  }

  /**  Add extra attributes like id's to the component */
  @Input() public set attributes(attributes: Array<Object> | Object | undefined) {
    this.settings.attributes = attributes;
    if (this.lookup) {
      this.lookup.settings.attributes = this.settings.attributes;
      this.markForUpdate();
    }
  }
  public get attributes(): Array<Object> | Object | undefined {
    return this.settings.attributes;
  }

  /**  Set the input to tabbable */
  @Input() public set tabbable(tabbable: boolean | undefined) {
    this.settings.tabbable = tabbable;
    if (this.lookup) {
      this.lookup.settings.tabbable = this.settings.tabbable;
      this.markForUpdate();
    }
  }
  public get tabbable(): boolean | undefined {
    return this.settings.tabbable;
  }

  /**  Set the input to allow duplicates */
  @Input() public set allowDuplicates(allowDuplicates: boolean | undefined) {
    this.settings.allowDuplicates = allowDuplicates;
    if (this.lookup) {
      this.lookup.settings.allowDuplicates = this.settings.allowDuplicates;
      this.markForUpdate();
    }
  }
  public get allowDuplicates(): boolean | undefined {
    return this.settings.allowDuplicates;
  }

  @Input() multiselect = false;

  @Input() name?: string;

  // Make sure you bind the context to the function
  @Input() source?: SohoDataGridSourceFunction;

  @Input() toolbar: any;

  // Autocomplete template settings
  @Input() autoCompleteSettings?: SohoLookupAutoComplete;

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   */
  @Output() afteropen: EventEmitter<Object> = new EventEmitter<Object>();

  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() start: EventEmitter<Object> = new EventEmitter<Object>();

  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() complete: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforeopen: EventEmitter<Object> = new EventEmitter<Object>();

  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() change: EventEmitter<SohoLookupChangeEvent[]> = new EventEmitter<SohoLookupChangeEvent[]>();
  @Output() inputEvt: EventEmitter<Object> = new EventEmitter<Object>();

  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() open: EventEmitter<Object> = new EventEmitter<Object>();

  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() close: EventEmitter<Object> = new EventEmitter<Object>();

  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() selected: EventEmitter<Object> = new EventEmitter<Object>();

  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() afterpaging: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.lookup') get isLookup() {
    return true;
  }

  /**
   * Is the lookup control disabled?
   */
  @HostBinding('disabled')
  private _disabled: boolean | undefined = undefined;

  /**
   * Accessor for _disabled.
   */
  public get isDisabled() {
    return this._disabled;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("disabled")
  public set isDisabled(disabled: boolean | undefined) {
    if (this._disabled !== disabled) {
      this._disabled = disabled;

      // Ensure the widget is updated.
      if (this._disabled) {
        this.ngZone.runOutsideAngular(() => this.lookup?.disable());
      } else {
        this.ngZone.runOutsideAngular(() => this.lookup?.enable());
      }
    }
  }

  /**
   * Add class binding.
   */
  @HostBinding('class.is-disabled')
  public get disabledClass() {
    return this._disabled;
  }

  /**
   * Is the lookup control readonly?
   */
  @HostBinding('readonly')
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('readonly') _readonly: boolean | undefined = undefined;

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;

  /**
   * Soho Lookup widget.
   *
   * @private
   */
  private lookup?: SohoLookupStatic | null;

  /**
   * Autocomplete
   */
  private autocomplete!: SohoAutoCompleteStatic | null;

  private settings: SohoLookupOptions = {};

  /** Initial dataset */
  private _dataset?: Object[];

  /**
   * Constructor.
   *
   * @param element associated element
   * @param ngZone angular zone
   */
  constructor(private element: ElementRef, private ngZone: NgZone) {
    super();
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(_event: KeyboardEvent) {
    // This is required, otherwise the form binding does not see updates.
    this.internalValue = this.jQueryElement?.val() as string;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      const dataSet = this._dataset ? this._dataset : [];

      // The default options for the data grid, which will
      // be overriden by the options provided by the caller
      // on a field by field basis.
      const datagridConfig: SohoDataGridOptions = {
        cellNavigation: false,
        columns: this.columns,
        dataset: dataSet,
        selectable: this.isMultiselect() ? 'multiple' : 'single',
        toolbar: Object.assign({
          actions: true,
          advancedFilter: false,
          dateFilter: false,
          fullWidth: true,
          keywordFilter: true,
          results: true,
          rowHeight: true,
          views: false,
        }, this.toolbar),
        source: this.source
      };

      this.settings.options = Object.assign(datagridConfig, this.options);
      this.jQueryElement.lookup(this.settings);

      // setup autocomplete
      if (this.autoCompleteSettings) {
        const acDataset = dataSet.map((data: { [key: string]: any }) => {
          return this.autoCompleteSettings ? {
            id: data[this.autoCompleteSettings.id],
            value: data[this.autoCompleteSettings.value],
            label: data[this.autoCompleteSettings.label]
          } : data;
        });

        const acSettings: SohoAutoCompleteOptions = { source: acDataset };

        if (this.autoCompleteSettings.template) {
          acSettings.template = this.autoCompleteSettings.template;
        }

        this.jQueryElement.autocomplete(acSettings);

        this.autocomplete = this.jQueryElement.data('autocomplete');

        this.jQueryElement
          .on('selected.autocomplete', (...args) => this.onAutocompleteSelected(args))
          .on('change.autocomplete', (_e: any, args: any[]) => this.onAutocompleteChange(args))
          .on('beforeopen.autocomplete', (_e: any, args: SohoAutoCompleteEvent) => this.onAutocompleteBeforeOpen(args));
      }

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('afteropen', (...args: any[]) => this.modalOpened(args));
      this.jQueryElement.on('beforeopen', () => this.ngZone.run(() => this.beforeopen.emit(undefined)));
      this.jQueryElement.on('open', () => this.ngZone.run(() => this.open.emit(undefined)));
      this.jQueryElement.on('change.lookup', (_e: any, args: SohoLookupChangeEvent[]) => this.onChange(args));
      this.jQueryElement.on('blur', (_e: any) => this.ngZone.run(() => this.touched()));
      this.jQueryElement.on('start', () => this.ngZone.run(() => this.start.emit(undefined)));
      this.jQueryElement.on('complete', () => this.ngZone.run(() => this.complete.emit(undefined)));
      this.jQueryElement.on('input', () => this.ngZone.run(() => this.inputEvt.emit(undefined)));
      this.jQueryElement.on('close', () => this.ngZone.run(() => this.close.emit(undefined)));
      this.jQueryElement.on('selected', (_e: any, selectedRows: any, op: any, rowData: any, lookup: any) => this.ngZone.run(() => this.selected.emit({ selectedRows, op, rowData, lookup })));
      this.jQueryElement.on('afterpaging', (_e: any, pagingInfo: any, lookup: any) => this.ngZone.run(() => this.afterpaging.emit({ pagingInfo, lookup })));

      this.lookup = this.jQueryElement.data('lookup');

      // Pick up the internal value from the form control.
      if (this.internalValue) {
        this.lookup?.element.val(this.internalValue);
      }
    });
  }

  /**
   * Update the selected rows
   */
  public updateSelectedRows(rows: any[]): void {
    if (this.lookup && Array.isArray(rows)) {
      this.ngZone.runOutsideAngular(() => ((this.lookup as any).updateSelectedRows(rows)));
      this.markForUpdate();
    }
  }

  /**
   * Find the row and select it based on select value / function / field value
   */
  public selectRowByValue(field: String, value: String): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup?.selectRowByValue(field, value));
    }
  }

  /** Get the selected rows and return them to the UI **/
  public insertRows(): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup?.insertRows());
    }
  }

  /** Returns the rows currently selected **/
  public selectedRows(): any[] {
    return this.ngZone.runOutsideAngular(() => {
      return ((this.lookup as any).selectedRows || []).slice();
    });
  }

  /** Enable the input. **/
  public enable(): void {
    this._disabled = false;
    this._readonly = false;
    this.ngZone.runOutsideAngular(() => this.lookup?.enable());
    this.markForUpdate();
  }

  /** Disable the input. **/
  public disable(): void {
    this._disabled = true;
    this.ngZone.runOutsideAngular(() => this.lookup?.disable());
    this.markForUpdate();
  }

  /** Make the input readonly. **/
  public readonly(): void {
    this._readonly = true;
    this.ngZone.runOutsideAngular(() => this.lookup?.readonly());
    this.markForUpdate();
  }

  /**  Send in a new data set to display in the datagrid in the lookup. **/
  public updateDataset(dataset: Object[], pagerInfo: SohoPagerPagingInfo): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup?.updateDataset(dataset, pagerInfo));
    }
  }

  /**
   * Call to notify the lookup about any dom/settings changes
   */
  public updated(settings?: any): void {
    if (settings) {
      this.settings = Soho.utils.mergeSettings((this.element as any)[0], settings, this.settings);
    }

    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup?.updated(this.settings));
    }
  }

  /**
   * Destroys the modal lookup.
   */
  destroy() {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup?.destroy());
    }
  }

  ngAfterViewChecked() {
    if (this.updateRequired) {
      this.updated();
      this.updateRequired = false;
    }
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }

      if (this.lookup) {
        this.lookup.destroy();
        this.lookup = null;
      }

      if (this.autocomplete) {
        this.autocomplete.destroy();
        this.autocomplete = null;
      }
    });
  }

  isMultiselect(): boolean | undefined {
    return this.multiselect !== false || (this.options && this.options.selectable === 'multiple');
  }

  modalOpened(args: any[]) {
    this.ngZone.run(() => {
      this.modal = this.lookup?.modal;

      /**
       * Temporary fix for inability for grid to async call data and resize modal on returned
       * values (only necessary when the page size is large enough to make the datagrid larger
       * than the current modal content window height):
       * jira/browse/SOHO-4347
       */
      if (args[1] && args[2]) {

        const datagrid: SohoDataGridStatic = args[1];
        const modal: SohoModalStatic = args[2];

        if (datagrid.pagerAPI) {
          datagrid.pagerAPI.element.on('afterpaging', () => {
            modal.resize();
          });
        }
      }
      this.afteropen.emit(args);
    });
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoLookupChangeEvent[]) {
    this.ngZone.run(() => {
      this.parseValue(event);
      if (!event) {
        // prevent undefined exception when event is undefined.
        return;
      }

      // todo: why is this here, value is not defined anywhere, not sure where it's used so reluctant to remove it.
      event.values = this.internalValue;
      this.change.emit(event);
    });
  }

  onAutocompleteChange(event: any) {
    if (this.autoCompleteSettings && this.autoCompleteSettings.change) {
      this.autoCompleteSettings?.change(event);
    }
  }

  onAutocompleteSelected(event: any) {
    if (this.autoCompleteSettings && this.autoCompleteSettings.selected) {
      this.autoCompleteSettings?.selected(event);
    }
  }

  onAutocompleteBeforeOpen(event: any) {
    if (this.autoCompleteSettings && this.autoCompleteSettings.beforeopen) {
      this.autoCompleteSettings?.beforeopen(event);
    }
  }

  setDisabledState(isDisabled: boolean | undefined): void {
    // Update the jQuery widget with the requested disabled state.
    this.isDisabled = isDisabled;
  }

  /**
   * Needed to extract this function from the 'insertRows' function within the
   * Soho Lookup control object.
   * TODO: Expose this in the Sohoxi library @tim @ed.coyle
   *
   * @todo raise SOHO jira issue
   */
  processValue(value: Object | Object[]): string {
    if (!value || !this.lookup) {
      return '';
    }
    let val = '';
    let toProcess: Object[] = value as Object[];
    if (!Array.isArray(toProcess)) {
      toProcess = [toProcess];
    }

    // mimics functionality in sohoxi lookup insertRows()
    for (let i = 0; i < toProcess.length; i++) {
      let current = '';

      if (typeof toProcess[i] === 'object') {
        if (typeof this.settings.field === 'function') {
          current = (this.settings.field as SohoLookupFieldFunction)(toProcess[i], this.lookup.element, this.lookup.grid);
        } else {
          current = (toProcess[i] as any)[this.settings.field as string];
        }
      } else {
        current = toProcess[i] as string;
      }

      val += (i !== 0 ? ',' : '') + current;
    }

    return val;
  }

  /**
   * Set lookup value to allow the lookup element to be updated correctly.
   * Used when the click property is set on the sohoxi control.
   *
   * @param event - selected row
   * TODO: Expose this in the Sohoxi library @tim @ed.coyle
   *
   * @todo raise SOHO jira issue
   */
  setValue(event: SohoLookupChangeEvent[]) {
    if (this.lookup) {
      this.parseValue(event);

      // mimics functionality in sohoxi lookup insertRows()
      this.lookup.element.val(this.internalValue).trigger('change', [event]);
      this.lookup.element.trigger('focus');
    }
  }

  /**
   * Override writeValue to allow the lookup
   * element to be updated correctly.
   *
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);
    if (this.lookup) {
      // The processing is required to ensure we use the correct format
      // in the control.
      this.lookup.element.val(this.processValue(value));
    }
  }

  // private methods

  /**
   * Evaluate the event param and parse the value
   */
  private parseValue(event: SohoLookupChangeEvent[]) {
    if (!event) {
      // sometimes the event is not available
      this.internalValue = this.lookup?.element.val();
      return;
    }

    if (event.length && event.length === 1 && !this.isMultiselect()) {
      this.internalValue = this.asobject ? event[0].data : this.processValue(event[0].data);
    } else {
      this.internalValue = event.map(val => this.asobject ? val.data : this.processValue(val.data));
    }
  }

  private markForUpdate(): void {
    this.updateRequired = true;
  }
}
