
import {
  of,
  Observable,
  Subject
} from 'rxjs';

import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent, SohoPopupMenuComponent } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';

import { DataGridDemoService } from './datagrid-demo.service';

@Component({
  selector: 'app-datagrid-dynamic-demo',
  templateUrl: 'datagrid-dynamic.demo.html',
  providers: [DataGridDemoService]
})
export class DataGridDynamicDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;
  @ViewChild(SohoPopupMenuComponent) popupMenu?: SohoPopupMenuComponent;

  private _subject$ = new Subject();
  public data = this._subject$.asObservable();
  public displayContextMenu = false;
  public contextMenuEvent: any;
  public contextMenuId = 'grid-context-menu';
  private menuItemsChoice = -1;
  public menuItems?: MenuItem[];

  constructor(
    private service: DataGridDemoService
  ) { }

  ngAfterViewInit() {
    this.addRows();
  }

  public get columns(): Observable<SohoDataGridColumn[]> {
    return of(this.service.getColumns());
  }

  private addRows() {
    this.service.getData((null) as any).subscribe((d: any[]) => {
      this.busyIndicator?.open();
      const newData = new Array<any>(...d);
      newData.forEach((r) => r.orderDate = new Date());
      this._subject$.next(newData);
      this.busyIndicator?.close(true);
    });
  }

  addRow() {
    this.service.getData((null) as any).subscribe((d: any[]) => {
      const newData = new Array<any>(d[0]);
      newData.forEach((r) => r.orderDate = new Date());
      this.dataGrid?.addRow(newData[0], 'top');
    });
  }

  busy() {
    if (this.busyIndicator) {
      (this.busyIndicator as any).activated = true;
      setTimeout(() => (this.busyIndicator as any).activated = false, 2000);
    }
  }

  toggleFilterRow() {
    this.dataGrid?.toggleFilterRow();
  }

  resetFilter() {
    this.dataGrid?.clearFilter();
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    console.log('onSelected()', e);
  }

  onRowDoubleClicked(e: SohoDataGridRowClicked) {
    console.log('onRowDoubleClicked()', e);
  }

  onRowClicked(e: SohoDataGridRowClicked) {
    console.log('onRowClicked()', e);
  }

  onContextMenu(e: SohoDataGridRowClicked) {
    this.dataGrid?.unSelectAllRows();
    this.dataGrid?.selectRows([e.row]);
    this.buildMenuOptions();
  }

  onContextMenuClose(e: any) {
    console.log('onContextMenuClose()', e);
  }

  onMenuItemSelected(e: any) {
    console.log('onMenuItemSelected()', e);
  }

  onBeforeContextMenuOpen(e: SohoPopupMenuEvent) {
    debugger;
    console.log('onBeforeContextMenuOpen()', e);
  }

  onContextMenuOpen(e: any) {
    console.log('onContextMenuOpen()', e);
  }

  private buildMenuOptions() {
    if (this.menuItemsChoice === 2) {
      this.menuItemsChoice = -1;
    }

    this.menuItemsChoice++;
    this.menuItems = []; // reset menuItems array.

    switch (this.menuItemsChoice) {
      case 0:
        this.menuItems.push({ label: 'Setting One' });
        this.menuItems.push({ label: 'Setting Two' });
        this.menuItems.push({ label: 'Settings Three' });
        this.menuItems.push({ label: 'Setting Four' });
        this.menuItems.push({
          label: 'Setting Five',
          submenu: [
            { label: 'Sub Menu 1' },
            { label: 'Sub Menu 2' }
          ]
        });
        break;

      case 1:
        this.menuItems.push({ label: 'Option One' });
        this.menuItems.push({ label: 'Option Two' });
        this.menuItems.push({ label: 'Option Three' });
        this.menuItems.push({ label: 'Option Four' });
        this.menuItems.push({ label: 'Option Five' });
        this.menuItems.push({ label: 'Option Six' });
        this.menuItems.push({ label: 'Option Seven' });
        this.menuItems.push({ label: 'Option Eight' });
        this.menuItems.push({ label: 'Option Nine' });
        this.menuItems.push({ label: 'Option Ten' });
        break;

      case 2:
        this.menuItems.push({ label: 'Action One' });
        this.menuItems.push({ label: 'Action Two' });
        this.menuItems.push({ label: 'Action Three' });
        break;
    }
  }
}

interface MenuItem {
  label: string;
  submenu?: MenuItem[];
}
