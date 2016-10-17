import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

// import { ControlValueAccessor } from '@angular/forms';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils';

@Component({
  selector: 'soho-lookup',
  templateUrl: 'soho-lookup.component.html',
  providers: [provideControlValueAccessor(SohoLookupComponent)]
})
export class SohoLookupComponent extends BaseControlValueAccessor<any> implements AfterViewInit, OnDestroy {

  /**
   * Available Soho Template control settings as Inputs
   * Should match the Soho properties for the component
   */
  // Make sure you bind the context to the function
  @Input() set beforeShow(value: SohoLookupOptionsBeforeShowFunction) {
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

  @Input() set field(value: string | SohoLookupFieldFunction) {
    this._options.field = value;
  }

  @Input() set title(value: string) {
    this._options.title = value;
  }

  @Input() label: string;

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

  @ViewChild('inputElement') inputElement: ElementRef;

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

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.inputElement.nativeElement);

    // The default options for the data grid, which will
    // be overriden by the options provided by the caller
    // on a field by field basis.
    const datagridConfig: SohoDataGridOptions = {
      cellNavigation: false,
      columns: this.columns,
      dataset: this._dataset ? this._dataset : [],
      selectable: 'single',
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

    this.lookup = this.jQueryElement.data('lookup');
  }
  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.lookup) {
      this.lookup.destroy();
      this.lookup = null;
    }
  }
  modalOpened(args: any[]) {
    /**
     * Temporary fix for inability for grid to async call data and resize modal on returned
     * values (only necessary when the page size is large enough to make the datagrid larger
     * than the current modal content window height):
     * jira/browse/SOHO-4347
     */
    if (args[1] && args[2]) {

      let datagrid: SohoDataGridStatic = args[1],
        modal: SohoModalStatic = args[2];

      if (datagrid.pager) {
        datagrid.pager.element.on('afterpaging', function () {
          modal.resize();
        }.bind(this));
      }
    }
    this.afteropen.emit(args);
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoLookupChangeEvent[]) {
    if (event.length && event.length === 1) {
      this.value = event[0].data;
    } else {
      this.value = event.map(val => { return val.data; });
    }
    this.change.emit(event);
  }

  /**
   * Needed to extract this function from the 'insertRows' function within the
   * Soho Lookup control object.
   * TODO: Expose this in the Sohoxi library @tim @ed.coyle
   *
   * @todo raise SOHO jira issue
   */
  processValue(value: Object | Object[]): string {
    let val = '';
    let toProcess: Object[] = <Object[]>value;
    if (!Array.isArray(toProcess)) {
      toProcess = [toProcess];
    }

    for (let i = 0; i < toProcess.length; i++) {
      let current = '';

      if (typeof this._options.field === 'function') {
        current = (<SohoLookupFieldFunction>this._options.field)(toProcess[i], this.lookup.element, this.lookup.grid);
      } else {
        current = (<any>toProcess[i])[<string>this.field];
      }

      val += (i !== 0 ? ',' : '') + current;
    }

    return val;
  }

  /**
   * Override writeValue to allow the lookup
   * element to be updated correctly.
   *
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);
    if (this.lookup && value) {
      // The processing is required to ensure we use the correct format
      // in the control.
      this.lookup.element.val(this.processValue(value));
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
