import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoDataGridComponent } from '../../components/datagrid';

@Component({
  selector: 'sample-datagrid',
  templateUrl: 'datagrid-content.demo.html',
  providers: [],
  directives: [SohoDataGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridContentDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  addRow() {
    this.dataGrid.addRow({}, 'top');
  }

  busy() {}

  onSelected(e: any) {
  }
}
