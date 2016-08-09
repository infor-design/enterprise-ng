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
  GridColumn,
  SohoDatagridConfiguration,
  SohoDatagridSource,
  SohoSourceFunction,
} from '../datagrid';
import { SohoLookupChangeEvent } from './';

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
  @Input() beforeShow: Function;
  @Input() context: any;
  @Input() columns: GridColumn[];
  @Input() set dataset(data: Object[]) {
    this._dataset = data;
    if (data && this.jQueryElement) {
      this.lookup.datagrid.loadData(data);
    }
  }
  @Input() editable: boolean;
  @Input() label: string;
  @Input() name: string;
  @Input() options: SohoDatagridConfiguration;
  @Input() select: Function;
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
      dataset: this._dataset ? this._dataset : [],
      columns: this.columns,
      columnReorder: false,
      selectable: 'single',
      toolbar: Object.assign({
        results: false,
        dateFilter: false,
        keywordFilter: true,
        advancedFilter: false,
        actions: true,
        views: false,
        rowHeight: true,
      }, this.toolbar),
      source: this.source,
    };

    this.jQueryElement.lookup({
      editable: this.editable,
      field: this.select ? this.select.bind(this.context) : null,
      beforeShow: this.beforeShow ? this.beforeShow.bind(this.context) : null,
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
    this.lookup.destroy();
  }
  modalOpened(args: any) {
    /**
     * Temporary fix for inability for grid to async call data and resize modal on returned
     * values:
     * jira/browse/SOHO-4347
     */
    if (args[1] && args[2]) {
      this.modal = args[1];
      this.datagrid = args[2];
      if (this.datagrid.pager) {
        this.datagrid.pager.element.on('afterpaging', function() {
          this.modal.resize();
        }.bind(this));
      }
    }
    this.afteropen.emit(args);
  }
}
