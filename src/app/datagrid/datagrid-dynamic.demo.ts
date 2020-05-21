
import {
  of,
  Observable,
  BehaviorSubject
} from 'rxjs';

import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoPopupMenuComponent
} from 'ids-enterprise-ng';

import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';

import { DataGridDemoService } from './datagrid-demo.service';

@Component({
  selector: 'app-datagrid-dynamic-demo',
  templateUrl: 'datagrid-dynamic.demo.html',
  providers: [DataGridDemoService]
})
export class DataGridDynamicDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator: SohoBusyIndicatorDirective;
  @ViewChild(SohoPopupMenuComponent) popupMenu: SohoPopupMenuComponent;

  private _subject$ = new BehaviorSubject([]);
  public data = this._subject$.asObservable();
  public displayContextMenu = false;
  public contextMenuEvent: any;
  public contextMenuId = 'grid-context-menu';
  private menuItemsChoice = -1;
  public menuItems: Array<{label: string}> = [];

  constructor(
    private service: DataGridDemoService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => this.addRows(), 1000);
  }

  public get columns(): Observable<SohoDataGridColumn[]> {
    return of(this.service.getColumns());
  }

  addRows() {
    this.service.getData(null).subscribe((d: any[]) => {
      this.busyIndicator.open();
      const newData = new Array<any>(...d);
      newData.forEach((r) => r.orderDate = new Date());
      this._subject$.next(newData);
      this.busyIndicator.close(true);
    });
  }

  addRow() {
    this.service.getData(null).subscribe((d: any[]) => {
      const newData = new Array<any>(d[0]);
      newData.forEach((r) => r.orderDate = new Date());
      this.dataGrid.addRow(newData[0], 'top');
    });
  }

  busy() {
    if (this.busyIndicator) {
      this.busyIndicator.activated = true;
      setTimeout(() => this.busyIndicator.activated = false, 2000);
    }
  }

  toggleFilterRow() {
    this.dataGrid.toggleFilterRow();
  }

  resetFilter() {
    this.dataGrid.clearFilter();
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
    e.originalEvent.preventDefault();
    console.log('contextmenu fired', e);

    // -----------------------------------------------------------------
    // destroy any existing popup menu so that the dom markup is
    // completely removed. this is needed before the new menu is
    // built and displayed.
    // -----------------------------------------------------------------
    if (this.popupMenu) {
      this.contextMenuEvent = null;
      this.displayContextMenu = false;

      this.popupMenu.close();
      this.popupMenu.destroy();
    }

    // -----------------------------------------------------------------
    // select right click row, unselect any other row first.
    // -----------------------------------------------------------------
    this.dataGrid.unSelectAllRows();
    this.dataGrid.selectRows([ e.row ]);

    // -----------------------------------------------------------------
    // build the right click menu items array dynamically. When the
    // context menu is generated into the dom it will use these items
    // -----------------------------------------------------------------
    this.buildMenuOptions();

    // -----------------------------------------------------------------
    // cause the new right click menu markup to be built, which
    // causes the popup menu to be displayed.
    // -----------------------------------------------------------------
    setTimeout(() => {
      this.contextMenuEvent = e.originalEvent;
      this.displayContextMenu = true;
    });

    return false;
  }

  onContextMenuClose(e: any) {
    console.log('onContextMenuClose()', e);

    this.contextMenuEvent = null;
    this.displayContextMenu = false;
  }

  onMenuItemSelected(e: any) {
    console.log('onMenuItemSelected()', e);
  }

  onBeforeContextMenuOpen(e: any) {
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
        this.menuItems.push({ label: 'Setting Five' });
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
