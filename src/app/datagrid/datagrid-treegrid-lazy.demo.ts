import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { SohoDataGridComponent, SohoDataGridToggleRowEvent } from 'ids-enterprise-ng';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DatagridTreegridLazyServiceDemo } from './datagrid-treegrid-lazy-service.demo';

@Component({
  selector: 'app-datagrid-treegrid-lazy-demo',
  templateUrl: 'datagrid-treegrid-lazy.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatagridTreegridLazyServiceDemo]
})
export class DataGridTreeGridLazyDemoComponent {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator: SohoBusyIndicatorDirective;

  events: any[] = [];

  constructor(private treeService: DatagridTreegridLazyServiceDemo) { }

  public get columns(): SohoDataGridColumn[] {
    return this.treeService.getColumns();
  }

  public get data(): any[] {
    return this.treeService.getData();
  }

  onExpandChildren(args: any) {
    console.log(args);

    const someData: any[] = [{
      id: 215,
      escalated: 0,
      taskName: 'Follow up action with Residental Housing',
      desc: 'Contact sales representative with the updated purchase order.',
      comments: 2,
      time: '22:10 PM'
    }];
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        args.grid.addChildren(args.row, someData);
        resolve();
      }, 1000);
    });
    return promise;
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
}
