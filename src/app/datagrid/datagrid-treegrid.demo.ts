import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent, SohoDataGridToggleRowEvent } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DatagridTreegridServiceDemo } from './datagrid-treegrid-service.demo';

@Component({
  selector: 'app-datagrid-treegrid-demo',
  templateUrl: 'datagrid-treegrid.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatagridTreegridServiceDemo]
})
export class DataGridTreeGridDemoComponent {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;

  events: any[] = [];

  constructor(private treeService: DatagridTreegridServiceDemo) { }

  public get columns(): SohoDataGridColumn[] {
    return this.treeService.getColumns().slice(1);
  }

  public get data(): any[] {
    return this.treeService.getData();
  }

  toggleFilterRow() {
    this.dataGrid?.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid?.clearFilter();
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
    const descr = e.rowData.taskName;
    this.events.push({ name: 'expandrow', descr, date: new Date() });
  }

  onCollapseRow(e: SohoDataGridToggleRowEvent) {
    const descr = e.rowData.taskName;
    this.events.push({ name: 'collapserow', descr, date: new Date() });
  }

  onRowActivated(e: SohoDataGridToggleRowEvent) {
    console.log(e);
  }

  makeChange() {
    (this.dataGrid as any).isList = !(this.dataGrid as any).isList;
    (this.dataGrid as any).alternateRowShading = !(this.dataGrid as any).alternateRowShading;
    (this.dataGrid as any).cellNavigation = !(this.dataGrid as any).cellNavigation;
  }

  toggleSelectAll() {
    (this.dataGrid as any).showSelectAllCheckBox = !(this.dataGrid as any).showSelectAllCheckBox;
    console.log(`showSelectAllCheckBox=${(this.dataGrid as any).showSelectAllCheckBox}`);
  }
}
