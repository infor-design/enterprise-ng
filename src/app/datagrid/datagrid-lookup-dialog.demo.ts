
import {
  of,
  Observable,
  BehaviorSubject
} from 'rxjs';

import {
  Component,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';

import { DataGridDemoService } from './datagrid-demo.service';
import { DataGridLookupSelectionEvent } from './datagrid-lookup-event.demo';

@Component({
  selector: 'soho-datagrid-lookup-dialog-demo',
  templateUrl: './datagrid-lookup-dialog.demo.html',
  providers: [DataGridDemoService],
})
export class DataGridLookupDialogDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  @Output() lookupSelection = new EventEmitter<DataGridLookupSelectionEvent>();

  private _subject$ = new BehaviorSubject([]);
  public data = this._subject$.asObservable();

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

  busy() {
    if (this.busyIndicator) {
      this.busyIndicator.activated = true;
      setTimeout(() => this.busyIndicator.activated = false, 2000);
    }
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    console.log('onSelected()', e);

    if (e.rows.length > 0) {
      const lookupSelectionEvent = new DataGridLookupSelectionEvent(this, e.rows);
      this.lookupSelection.emit(lookupSelectionEvent);
    }
  }
}
