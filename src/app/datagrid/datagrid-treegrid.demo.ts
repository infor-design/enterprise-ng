import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { SohoDataGridComponent, SohoDataGridToggleRowEvent } from 'ids-enterprise-ng';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DatagridTreegridServiceDemo } from './datagrid-treegrid-service.demo';

@Component({
  selector: 'soho-datagrid-treegrid-demo',
  templateUrl: './datagrid-treegrid.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ DatagridTreegridServiceDemo ]
})
export class DataGridTreeGridDemoComponent {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  events: any[] = [];

  constructor(private treeService: DatagridTreegridServiceDemo) {}

  public get columns(): SohoDataGridColumn[] {
    return this.treeService.getColumns();
  }

  public get data(): any[] {
    return this.treeService.getData();
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
    const descr = e.item.rowData.taskName;
    const event = { event: 'expandrow', descr: descr, date: new Date() };
    console.log(event);
    this.events.push({ name: 'expandrow', descr: descr, date: new Date() });
  }

  onCollapseRow(e: SohoDataGridToggleRowEvent) {
    const descr = e.item.rowData.taskName;
    this.events.push({ name: 'collapserow', descr: descr, date: new Date() });
  }

  makeChange() {
    this.dataGrid.isList = !this.dataGrid.isList;
    this.dataGrid.alternateRowShading = !this.dataGrid.alternateRowShading;
    this.dataGrid.cellNavigation = !this.dataGrid.cellNavigation;
  }
}
