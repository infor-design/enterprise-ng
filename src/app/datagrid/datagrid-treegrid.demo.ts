import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoDataGridToggleRowEvent,
} from 'ids-enterprise-ng';

import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-datagrid-treegrid-demo',
  templateUrl: './datagrid-treegrid.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridTreeGridDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  events: any[] = [];

  _columns: SohoDataGridColumn[];
  _data: Object[];
  constructor(private el: ElementRef) { }

  public get columns(): SohoDataGridColumn[] {
    if (!this._columns) {
      this._columns = [];
      /* tslint:disable */
      this._columns.push({id: 'selectionCheckbox', sortable: false, resizable: false, formatter: Soho.Formatters.SelectionCheckbox, align: 'center'});
      this._columns.push({id: 'taskName', name: 'Task', field: 'taskName', expanded: 'expanded', formatter: Soho.Formatters.Tree, filterType: 'text'});
      this._columns.push({id: 'id', name: 'Id', field: 'id', filterType: 'text'});
      this._columns.push({id: 'desc', name: 'Description', field: 'desc', filterType: 'text'});
      this._columns.push({id: 'comments', name: 'Comments', field: 'comments', formatter: Soho.Formatters.Hyperlink, filterType: 'text'});
      this._columns.push({id: 'time', name: 'Time', field: 'time', filterType: 'time' });
      /* tslint:enable */
    }
    return this._columns;
  }

  public get data(): any[] {
    if (!this._data) {
      /* tslint:disable */
      this._data = [
        {id: 1, escalated: 2, depth: 1, expanded: false, taskName: 'Follow up action with HMM Global', desc: '', comments: null, time: '', children: [
            {id: 2, escalated: 1, depth: 2, taskName: 'Quotes due to expire',  desc: 'Update pending quotes and send out again to customers.', comments: 3, time: '7:10 AM'},
            {id: 3, escalated: 0, depth: 2, taskName: 'Follow up action with Universal Shipping Logistics Customers', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '9:10 AM'},
            {id: 4, escalated: 0, depth: 2, taskName: 'Follow up action with Acme Trucking', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '14:10 PM'},
          ]
        },
        {id: 5, escalated: 0, depth: 1, taskName: 'Follow up action with Residental Housing', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '18:10 PM'},
        {id: 6, escalated: 0, depth: 1, taskName: 'Follow up action with HMM Global', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '20:10 PM'},
        {id: 7, escalated: 0, depth: 1, expanded: true, taskName: 'Follow up action with Residental Housing', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '22:10 PM', children: [
          {id: 8, escalated: 0, depth: 2, taskName: 'Follow up action with Universal HMM Logistics', desc: 'Contact sales representative.', comments: 2, time: '22:10 PM'},
            {id: 9, escalated: 0, depth: 2, taskName: 'Follow up action with Acme Shipping', desc: 'Contact sales representative.', comments: 2, time: '22:10 PM'},
            {id: 10, escalated: 0, depth: 2, expanded: true, taskName: 'Follow up action with Residental Shipping Logistics ', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM', children: [
                {id: 11, escalated: 0, depth: 3, taskName: 'Follow up action with Universal Shipping Logistics Customers', desc: 'Contact sales representative.', comments: 2, time: '14:10 PM'},
                {id: 12, escalated: 0, depth: 3, expanded: true, taskName: 'Follow up action with Acme Universal Logistics Customers', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM', children: [
                    {id: 13, escalated: 0, depth: 4, taskName: 'More Contact', desc: 'Contact sales representative.', comments: 2, time: '14:10 PM'},
                    {id: 14, escalated: 0, depth: 4, taskName: 'More Follow up', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM'},
                  ]
                },
              ]
            }
          ]
        }
      ];
    }
    return this._data;
  }

  toggleFilterRow() {
    this.dataGrid.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid.clearFilter();
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    if (e.rows && e.rows.forEach) {
      let descr = '';
      e.rows.forEach((r) => {
        if (r.data) {
          descr += `${r.data.taskName}\n`;
        }
      });
      this.events.push({ name: 'Selected', descr: descr, date: new Date() });
    }
  }

  onExpandRow(e: SohoDataGridToggleRowEvent) {
    let descr = e.item.rowData.taskName;
    let event = { event: 'expandrow', descr: descr, date: new Date() };
    console.log(event);
    this.events.push({ name: 'expandrow', descr: descr, date: new Date() });
  }

  onCollapseRow(e: SohoDataGridToggleRowEvent) {
    let descr = e.item.rowData.taskName;
    this.events.push({ name: 'collapserow', descr: descr, date: new Date() });
  }

  makeChange() {
    this.dataGrid.isList = !this.dataGrid.isList;
    this.dataGrid.alternateRowShading = !this.dataGrid.alternateRowShading;
    this.dataGrid.cellNavigation = !this.dataGrid.cellNavigation;
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }
}
