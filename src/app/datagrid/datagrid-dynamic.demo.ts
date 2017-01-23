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

import { SohoDataGridComponent } from '@infor/sohoxi-angular';
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

  private _subject$ = new BehaviorSubject([]);

  public data = this._subject$.asObservable();

  constructor(private el: ElementRef,
              private service: DataGridDemoService) {
  }

  public get columns(): Observable<SohoDataGridColumn[]> {
    return Observable.of(this.service.getColumns());
  }

  addRows() {
    this.service.getData(null).subscribe((d: any[]) => {
      this.busyIndicator.open();
      let newData = new Array<any>(...d);
      newData.forEach((r) => r.orderDate = new Date());
      this._subject$.next(newData);
      this.busyIndicator.close(true);
      setTimeout(() => this.addRows(), 2000);
    });
  }

  addRow() {
    this.service.getData(null).subscribe((d: any[]) => {
      let newData = new Array<any>(d[0]);
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

  onSelected(e: any) {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => this.addRows(), 1000);
  }
}
