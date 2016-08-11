import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

import {
  SohoGridColumn,
  SohoDatagridConfiguration,
  SohoDatagridSource,
  SohoSourceFunction
} from '../datagrid';

import { SohoLookupChangeEvent } from './index'; // @todo sorry Visual Studio is blowing on this without the index.

@Component({
  moduleId: module.id,
  selector: 'soho-lookup',
  templateUrl: 'lookup.component.html'
})
export class SohoLookupComponent implements AfterViewInit, OnDestroy, SohoDatagridSource {
  /**
   * Available Soho Template control settings as Inputs
   * Should match the Soho properties for the component
   */
    // Make sure you bind the context to the function
  @Input() beforeShow: Function;
  @Input() columns: SohoGridColumn[];
  @Input() set dataset(data: Object[]) {
    this._dataset = data;
    if (data && this.jQueryElement) {
      this.lookup.datagrid.loadData(data);
    }
  }
  @Input() editable: boolean;
  @Input() field: string | Function;
  @Input() label: string;
  @Input() name: string;
  @Input() options: SohoDatagridConfiguration;
  // Make sure you bind the context to the function
  @Input() source: SohoSourceFunction;
  @Input() toolbar: any;

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
   */
  @Output() afteropen: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforeopen: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() change: EventEmitter<SohoLookupChangeEvent> = new EventEmitter<SohoLookupChangeEvent>();
  @Output() open: EventEmitter<Object> = new EventEmitter<Object>();

  @ViewChild('inputElement') inputElement: ElementRef;

  /**
   * Local variables
   */
  private jQueryElement: any;
  private lookup: any;
  private datagrid: any;
  private modal: any;
  private _dataset: Object[];

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    // TODO: Figure out what element to send to jQuery to init the component
    this.jQueryElement = jQuery(this.inputElement.nativeElement);

    const datagridConfig: SohoDatagridConfiguration = {
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

    this.jQueryElement.lookup({
      editable: this.editable,
      field: this.field ? this.field : null,
      beforeShow: this.beforeShow ? this.beforeShow : null,
      options: Object.assign(datagridConfig, this.options),
    });

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('afteropen', (...args: any[]) => this.modalOpened(args));
    this.jQueryElement.on('beforeopen', () => this.beforeopen.emit(null));
    this.jQueryElement.on('open', () => this.open.emit(null));
    this.jQueryElement.on('change', (e: any, args: SohoLookupChangeEvent) => this.change.emit(args));

    this.lookup = this.jQueryElement.data('lookup');
  }
  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.lookup) {
      this.lookup.destroy();
    }
  }
  modalOpened(args: any) {
    /**
     * Temporary fix for inability for grid to async call data and resize modal on returned
     * values (only necessary when the page size is large enough to make the datagrid larger
     * than the current modal content window height):
     * jira/browse/SOHO-4347
     */
    if (args[1] && args[2]) {
      this.modal = args[1];
      this.datagrid = args[2];
      if (this.datagrid.pager) {
        this.datagrid.pager.element.on('afterpaging', function() {
          this.modal.resize();
        }.bind(this)); // <-- magic --
      }
    }
    this.afteropen.emit(args);
  }
}
