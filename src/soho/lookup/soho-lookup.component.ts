import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-lookup]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoLookupComponent)]
})
export class SohoLookupComponent extends BaseControlValueAccessor<any> implements AfterViewInit, OnDestroy {

  /**
   * Available Soho Template control settings as Inputs
   * Should match the Soho properties for the component
   */
  @Input() asobject = false; // set to false for backwards compatibility

  // Make sure you bind the context to the function
  @Input() set beforeShow(value: SohoLookupBeforeShowFunction) {
    this._options.beforeShow = value;
  }

  /** Grid columns. */
  @Input() columns: SohoDataGridColumn[];

  @Input() set dataset(data: Object[]) {
    this._dataset = data;
    if (data && this.jQueryElement) {
      this.lookup.grid.loadData(data);
    }
  }

  @Input() set editable(value: boolean) {
    this._options.editable = value;
  }

  @Input() set autoWidth(value: boolean) {
    this._options.autoWidth = value;
  }

  @Input() set field(value: string | SohoLookupFieldFunction) {
    this._options.field = value;
  }

  @Input() set match(match: SohoDataGridMatchFunction) {
    this._options.match = match;
  }

  // Make sure you bind the context to the function
  @Input() set click(value: SohoLookupClickFunction) {
    this._options.click = value;
  }

  @Input() set title(value: string) {
    this._options.title = value;
  }

  @Input() multiselect = false;

  @Input() name: string;

  @Input() options: SohoDataGridOptions;

  // Make sure you bind the context to the function
  @Input() source: SohoDataGridSourceFunction;

  @Input() toolbar: any;

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   */
  @Output() afteropen: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforeopen: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() change: EventEmitter<SohoLookupChangeEvent[]> = new EventEmitter<SohoLookupChangeEvent[]>();
  @Output() open: EventEmitter<Object> = new EventEmitter<Object>();

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

  private _options: SohoLookupOptions = {};

  /** Initial dataset */
  private _dataset: Object[];

  constructor(private element: ElementRef) {
    super();
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent, val) {
    // This is required, otherwise the the form binding does not see updates.
    this.internalValue = this.jQueryElement.val() as string;
  }

  ngAfterViewInit() {
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

    this._options.options = Object.assign(datagridConfig, this.options);

    this.jQueryElement.lookup(this._options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('afteropen', (...args: any[]) => this.modalOpened(args));
    this.jQueryElement.on('beforeopen', () => this.beforeopen.emit(null));
    this.jQueryElement.on('open', () => this.open.emit(null));
    this.jQueryElement.on('change', (e: any, args: SohoLookupChangeEvent[]) => this.onChange(args));
    this.jQueryElement.on('blur', (e: any) => this.touched());

    this.lookup = this.jQueryElement.data('lookup');

    if (this.internalValue) {
      this.lookup.element.val(this.internalValue);
    }
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.lookup) {
      this.lookup.destroy();
      this.lookup = null;
    }
  }

  isMultiselect(): boolean {
    return this.multiselect !== false || (this.options && this.options.selectable === 'multiple');
  }

  modalOpened(args: any[]) {
    /**
     * Temporary fix for inability for grid to async call data and resize modal on returned
     * values (only necessary when the page size is large enough to make the datagrid larger
     * than the current modal content window height):
     * jira/browse/SOHO-4347
     */
    if (args[1] && args[2]) {

      const datagrid: SohoDataGridStatic = args[1],
        modal: SohoModalStatic = args[2];

      if (datagrid.pager) {
        datagrid.pager.element.on('afterpaging', () => {
          modal.resize();
        });
      }
    }
    this.afteropen.emit(args);
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoLookupChangeEvent[]) {
    this.parseValue(event);
    if (!event) {
      // prevent undefined exception when event is undefined.
      return;
    }

    // todo: why is this here, value is not defined anywhere, not sure where it's used so reluctant to remove it.
    event.values = this.internalValue;

    // todo: theo: thinking it should be this instead - Phillip 2018/04/02
    // if (!event) {
    //   event = [{}];
    // }
    // event[0].value = this.internalValue;

    this.change.emit(event);
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
        if (typeof this._options.field === 'function') {
          current = (this._options.field as SohoLookupFieldFunction)(toProcess[i], this.lookup.element, this.lookup.grid);
        } else {
          current = (toProcess[i] as any)[this._options.field as string];
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
      this.lookup.element.focus();
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
   * @param event
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
}

declare abstract class OnBeforeLookupShow {
  /**
   * Used to manage data prior to showing the lookup.
   *
   * For example:
   *  - When the button is clicked, show a loading dialog and make the request for
   *    lookup grid data.
   *  - Upon receiving grid data, set lookup.settings.options for the columns and dataset.
   *  - Then call grid() to build the grid and complete the lookup call.
   */
  abstract onBeforeLookupShow: (lookup: any, grid: (gridOptions: Object) => {}) => any;
}
