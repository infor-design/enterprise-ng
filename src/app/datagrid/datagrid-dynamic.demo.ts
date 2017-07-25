import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SohoDataGridComponent, SohoPopupMenuComponent } from '@infor/sohoxi-angular';
import { SohoBusyIndicatorDirective } from '@infor/sohoxi-angular';

import {
  DataGridDemoService
} from './datagrid-demo.service';

@Component({
  selector: 'soho-datagrid-dynamic-demo',
  templateUrl: './datagrid-dynamic.demo.html',
  providers: [DataGridDemoService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridDynamicDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;
  // @ViewChild(SohoPopupMenuComponent) popupMenu: SohoPopupMenuComponent;

  private _subject$ = new BehaviorSubject([]);

  public data = this._subject$.asObservable();

  public displayContextMenu = false;
  public contextMenuEvent: any;
  public contextMenuId = 'grid-context-menu';

  constructor(
    private service: DataGridDemoService
  ) {}

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => this.addRows(), 1000);
  }

  public get columns(): Observable<SohoDataGridColumn[]> {
    return Observable.of(this.service.getColumns());
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
    console.log('onSelected() - rows ' + e.rows)
  }

  onRowDoubleClicked(e: SohoDataGridRowClicked) {
    console.log('onRowDoubleClicked() - row: ' + e.row + ', cell: ' + e.cell);
  }

  onRowClicked(e: SohoDataGridRowClicked) {
    console.log('onRowClicked() - row: ' + e.row + ', cell: ' + e.cell);
  }

  onContextMenu(e: SohoDataGridRowClicked) {
    console.log('contextmenu fired', e);
    this.contextMenuEvent = e.originalEvent;
    this.displayContextMenu = true;
  }

  onMenuItemSelected(e: any) {
    console.log('onMenuItemSelected()- ' + e);
  }

  onBeforeContextMenuOpen(e: any) {
    console.log('onBeforeContextMenuOpen()- ' + e);
  }

  onContextMenuClose(e: any) {
    console.log('onContextMenuClose()- ' + e);
    this.displayContextMenu = false;
  }

  onContextMenuOpen(e: any) {
    console.log('onContextMenuOpen()- ' + e);
  }
}
