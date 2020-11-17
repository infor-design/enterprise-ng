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
} from '../utils/base-control-value-accessor';

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
  private updateRequired: boolean;

  /**
   * API for interacting with modal and then in turn the buttons on the dialog.
   */
  modal: SohoModalStatic;

  /**
   * Available Soho Template control settings as Inputs
   * Should match the Soho properties for the component
   */
  @Input() asobject = false; // set to false for backwards compatibility

  /** Grid columns. */
  @Input() columns: SohoDataGridColumn[];

  /**
   * Changes the dataset being used
   */
  @Input() public set dataset(data: Object[]) {
    if (!data) {
      return;
    }

    this._dataset = data;
    if (data && this.jQueryElement && this.lookup.settings) {
      this.lookup.settings.options.dataset = data;
      this.markForUpdate();
    }
  }
  public get dataset() {
    return this._dataset;
  }

  /** Custom click event; can be used with a modal dialog and custom list component */
  @Input() public set click(value: SohoLookupClickFunction) {
    this.settings.click = value;
    if (this.lookup) {
      this.lookup.settings.click = this.settings.click;
      this.markForUpdate();
    }
  }
  public get click() {
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

  /** Field to return from the array or can be a function. */
  @Input() public set field(value: string | SohoLookupFieldFunction) {
    this.settings.field = value;
    if (this.lookup) {
      this.lookup.settings.field = this.settings.field;
      this.markForUpdate();
    }
  }
  public get field() {
    return this.settings.field;
  }

  /** Dialog title or takes the label + Lookup. */
  @Input() public set title(value: string) {
    this.settings.title = value;
    if (this.lookup) {
      this.lookup.settings.title = this.settings.title;
      this.markForUpdate();
    }
  }
  public get title() {
    return this.settings.title;
  }

  /** Pass dialog buttons or Cancel / Apply. */
  @Input() public set buttons(value: SohoModalButton[]) {
    this.settings.buttons = value;
    if (this.lookup) {
      this.lookup.settings.buttons = this.settings.buttons;
      this.markForUpdate();
    }
  }
  public get buttons() {
    return this.settings.buttons;
  }

  /** Options to pass to the underlying data grid. */
  @Input() public set options(value: SohoDataGridOptions) {
    this.settings.options = value;
    if (this.lookup) {
      this.lookup.settings.options = this.settings.options;
      this.markForUpdate();
    }
  }
  public get options() {
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
  @Input() public set beforeShow(value: SohoLookupBeforeShowFunction) {
    this.settings.beforeShow = value;
    if (this.lookup) {
      this.lookup.settings.beforeShow = this.settings.beforeShow;
      this.markForUpdate();
    }
  }
  public get beforeShow() {
    return this.settings.beforeShow;
  }

  /** Custom modal content. */
  @Input() public set modalContent(value: JQuery | string) {
    this.settings.modalContent = value;
    if (this.lookup) {
      this.lookup.settings.modalContent = this.settings.modalContent;
      this.markForUpdate();
    }
  }
  public get modalContent() {
    return this.settings.modalContent;
  }

  /** Can the user type random text into the field. */
  @Input() public set editable(value: boolean) {
    this.settings.editable = value;
    if (this.lookup) {
      this.lookup.settings.editable = this.settings.editable;
      this.markForUpdate();
    }
  }
  public get editable() {
    return this.settings.editable;
  }

  /** If set to false the dialog wont apply the value on clicking a value. */
  @Input() public set autoApply(value: boolean) {
    this.settings.autoApply = value;
    if (this.lookup) {
      this.lookup.settings.autoApply = this.settings.autoApply;
      this.markForUpdate();
    }
  }
  public get autoApply() {
    return this.settings.autoApply;
  }

  /** Function used to match the search term to the data. */
  @Input() public set match(value: SohoDataGridMatchFunction) {
    this.settings.match = value;
    if (this.lookup) {
      this.lookup.settings.match = this.settings.match;
      this.markForUpdate();
    }
  }
  public get match() {
    return this.settings.match;
  }

  /** A function that fires to let you validate form items on open and select. */
  @Input() public set validator(value: SohoLookupValidatorFunction) {
    this.settings.validator = value;
    if (this.lookup) {
      this.lookup.settings.validator = this.settings.validator;
      this.markForUpdate();
    }
  }
  public get validator() {
    return this.settings.validator;
  }

  /** Set the width of the input to the width of the selection */
  @Input() public set autoWidth(value: boolean) {
    this.settings.autoWidth = value;
    if (this.lookup) {
      this.lookup.settings.autoWidth = this.settings.autoWidth;
      this.markForUpdate();
    }
  }
  public get autoWidth() {
    return this.settings.autoWidth;
  }

  /** The character  used to separate data strings */
  @Input() public set delimiter(value: string) {
    this.settings.delimiter = value;
    if (this.lookup) {
      this.lookup.settings.delimiter = this.settings.delimiter;
      this.markForUpdate();
    }
  }
  public get delimiter() {
    return this.settings.delimiter;
  }

  /** Apply a minimum width to the lookup*/
  @Input() public set minWidth(value: number) {
    this.settings.minWidth = value;
    if (this.lookup) {
      this.lookup.settings.minWidth = this.settings.minWidth;
      this.markForUpdate();
    }
  }
  public get minWidth() {
    return this.settings.minWidth;
  }

  /**  Add an ability to clear the lookup field with an x */
  @Input() public set clearable(value: boolean) {
    this.settings.clearable = value;
    if (this.lookup) {
      this.lookup.settings.clearable = this.settings.clearable;
      this.markForUpdate();
    }
  }
  public get clearable() {
    return this.settings.clearable;
  }

  /**  Add extra attributes like id's to the component */
  @Input() public set attributes(attributes: Array<Object> | Object) {
    this.settings.attributes = attributes;
    if (this.lookup) {
      this.lookup.settings.attributes = this.settings.attributes;
      this.markForUpdate();
    }
  }
  public get attributes() {
    return this.settings.attributes;
  }

  @Input() multiselect = false;

  @Input() name: string;

  // Make sure you bind the context to the function
  @Input() source: SohoDataGridSourceFunction;

  @Input() toolbar: any;

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   */
  @Output() afteropen: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() start: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() complete: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforeopen: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() change: EventEmitter<SohoLookupChangeEvent[]> = new EventEmitter<SohoLookupChangeEvent[]>();
  @Output() inputEvt: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() open: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() close: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.lookup') get isLookup() {
    return true;
  }

  @HostBinding('attr.disabled')
  @Input()
  isDisabled = undefined;

  /**
   * Local variables
   */
  private jQueryElement: JQuery;

  private lookup: SohoLookupStatic;

  private settings: SohoLookupOptions = {};

  /** Initial dataset */
  private _dataset: Object[];

  constructor(private element: ElementRef, private ngZone: NgZone) {
    super();
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    // This is required, otherwise the form binding does not see updates.
    this.internalValue = this.jQueryElement.val() as string;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      // The default options for the data grid, which will
      // be overriden by the options provided by the caller
      // on a field by field basis.
      const datagridConfig: SohoDataGridOptions = {
        cellNavigation: false,
        columns: this.columns,
        dataset: this._dataset ? this._dataset : [],
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

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('afteropen', (...args: any[]) => this.modalOpened(args));
      this.jQueryElement.on('beforeopen', () => this.ngZone.run(() => this.beforeopen.emit(null)));
      this.jQueryElement.on('open', () => this.ngZone.run(() => this.open.emit(null)));
      this.jQueryElement.on('change', (e: any, args: SohoLookupChangeEvent[]) => this.onChange(args));
      this.jQueryElement.on('blur', (e: any) => this.ngZone.run(() => this.touched()));
      this.jQueryElement.on('start', () => this.ngZone.run(() => this.start.emit(null)));
      this.jQueryElement.on('complete', () => this.ngZone.run(() => this.complete.emit(null)));
      this.jQueryElement.on('input', () => this.ngZone.run(() => this.inputEvt.emit(null)));
      this.jQueryElement.on('close', () => this.ngZone.run(() => this.close.emit(null)));

      this.lookup = this.jQueryElement.data('lookup');

      if (this.internalValue) {
        this.lookup.element.val(this.internalValue);
      }
    });
  }

  /**
   * Find the row and select it based on select value / function / field value
   */
  public selectRowByValue(field: String, value: String): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup.selectRowByValue(field, value));
    }
  }

  /** Get the selected rows and return them to the UI **/
  public insertRows(): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup.insertRows());
    }
  }

  /** Enable the input. **/
  public enable(): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup.enable());
    }
  }

  /** Disable the input. **/
  public disable(): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup.disable());
    }
  }

  /** Make the input readonly. **/
  public readonly(): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup.readonly());
    }
  }

  /** Input is disabled or not **/
  public isReadonly(): boolean {
    if (this.lookup) {
      return this.ngZone.runOutsideAngular(() => this.lookup.isReadonly());
    }
  }

  /**  Send in a new data set to display in the datagrid in the lookup. **/
  public updateDataset(dataset: Object[], pagerInfo: SohoPagerPagingInfo): void {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup.updateDataset(dataset, pagerInfo));
    }
  }

  /**
   * Call to notify the lookup about any dom/settings changes
   */
  public updated(settings?: any): void {
    if (settings) {
      this.settings = Soho.utils.mergeSettings(this.element[0], settings, this.settings);
    }

    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup.updated(this.settings));
    }
  }

  /**
   * Destroys the modal lookup.
   */
  destroy() {
    if (this.lookup) {
      this.ngZone.runOutsideAngular(() => this.lookup.destroy());
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
      }
      if (this.lookup) {
        this.lookup.destroy();
        this.lookup = null;
      }
    });
  }

  isMultiselect(): boolean {
    return this.multiselect !== false || (this.options && this.options.selectable === 'multiple');
  }

  modalOpened(args: any[]) {
    this.ngZone.run(() => {
      this.modal = this.lookup.modal;

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

  setDisabledState(isDisabled: boolean): void {
    // Update the jQuery widget with the requested disabled state.
    this.isDisabled = isDisabled ? true : undefined;
  }

  /**
   * Needed to extract this function from the 'insertRows' function within the
   * Soho Lookup control object.
   * TODO: Expose this in the Sohoxi library @tim @ed.coyle
   *
   * @todo raise SOHO jira issue
   */
  processValue(value: Object | Object[]): string {
    if (!value) {
      return;
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
      this.internalValue = this.lookup.element.val();
      return;
    }

    if (event.length && event.length === 1 && !this.isMultiselect()) {
      this.internalValue = this.asobject !== false ? event[0].data : this.processValue(event[0].data);
    } else {
      this.internalValue = event.map(val => this.asobject !== false ? val.data : this.processValue(val.data));
    }
  }

  private markForUpdate(): void {
    this.updateRequired = true;
  }
}
