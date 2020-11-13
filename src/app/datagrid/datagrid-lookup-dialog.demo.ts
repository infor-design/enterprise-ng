import { of, Observable, BehaviorSubject } from 'rxjs';

import {
  Component,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';

import { DataGridDemoService } from './datagrid-demo.service';
import { DataGridLookupSelectionEvent } from './datagrid-lookup-event.demo';

@Component({
  selector: 'app-datagrid-lookup-dialog-demo',
  templateUrl: 'datagrid-lookup-dialog.demo.html',
  providers: [DataGridDemoService]
})
export class DataGridLookupDialogDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent, { static: true })
  dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true })
  busyIndicator?: SohoBusyIndicatorDirective;

  @Output() lookupSelection = new EventEmitter<
    DataGridLookupSelectionEvent<DataGridLookupDialogDemoComponent>
  >();

  private _subject$ = new BehaviorSubject([]);
  public data = this._subject$.asObservable();

  constructor(private service: DataGridDemoService) {}

  ngAfterViewInit() {
    setTimeout(() => this.addRows(), 1000);
  }

  public get columns(): Observable<SohoDataGridColumn[]> {
    return of(this.service.getColumns());
  }

  addRows() {
    this.service.getData((null as any)).subscribe((d: any[]) => {
      this.busyIndicator?.open();
      const newData = new Array<any>(...d);
      newData.forEach(r => (r.orderDate = new Date()));
      this._subject$.next((newData as any));
      this.busyIndicator?.close(true);
    });
  }

  busy() {
    if (this.busyIndicator) {
      (this.busyIndicator as any).activated = true;
      setTimeout(() => ((this.busyIndicator as any).activated = false), 2000);
    }
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    console.log('onSelected()', e);

    if (e.rows.length > 0) {
      const lookupSelectionEvent = new DataGridLookupSelectionEvent(
        this,
        e.rows
      );
      this.lookupSelection.emit(lookupSelectionEvent);
    }
  }
}
