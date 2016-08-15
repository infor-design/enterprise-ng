import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import {
  SohoGridColumn,
  SohoDatagridConfiguration,
  SohoDatagridSource,
  SohoSourceFunction
} from '../datagrid';

import { SohoLookupChangeEvent } from './index'; // @todo sorry Visual Studio is blowing on this without the index.

const SOHO_LOOKUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SohoLookupComponent),
  multi: true,
};

export type SohoFieldFunction = (data: Object, input: HTMLInputElement, grid: any) => string;

@Component({
  selector: 'soho-lookup',
  templateUrl: 'lookup.component.html',
  providers: [ SOHO_LOOKUP_VALUE_ACCESSOR ]
})
export class SohoLookupComponent implements AfterViewInit, ControlValueAccessor, OnDestroy, SohoDatagridSource {
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
  @Input() field: string | SohoFieldFunction;
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
  @Output() change: EventEmitter<SohoLookupChangeEvent[]> = new EventEmitter<SohoLookupChangeEvent[]>();
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
  private _value: any;
  private _onChangeCallback: any = () => {};
  private _onTouchedCallback: any = () => {};

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
    this.jQueryElement.on('change', (e: any, args: SohoLookupChangeEvent[]) => this.onChange(args));

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
  onChange(event: SohoLookupChangeEvent[]) {
    if (event.length && event.length === 1) {
      this._value = event[0].data;
      this._onChangeCallback(event[0].data);
    } else {
      this._value = event.map(val => { return val.data; });
      this._onChangeCallback(this._value);
    }
    this.change.emit(event);
  }
  /**
   * Needed to extract this function from the 'insertRows' function within the
   * Soho Lookup control object.
   * TODO: Expose this in the Sohoxi library @tim @ed.coyle
   */
  processValue(value: Object | Object[]): string {
    let val = '';
    let toProcess: Object[] = <Object[]>value;
    if (!Array.isArray(toProcess)) {
      toProcess = [toProcess];
    }

    for (let i = 0; i < toProcess.length; i++) {
      let current = '';

      if (typeof this.field === 'function') {
        current = (<SohoFieldFunction>this.field)(toProcess[i], this.lookup.element, this.lookup.grid);
      } else {
        current = (<any>toProcess[i])[<string>this.field];
      }

      val += (i !== 0 ? ',' : '') + current;
    }

    return val;
  }
  /**
   * Necessary for the ControlValueAccessor support
   */
  writeValue(value: any) {
    this._value = value;
    if (this.lookup && value) {
      this.lookup.element.val(this.processValue(value));
    }
  }
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

}
