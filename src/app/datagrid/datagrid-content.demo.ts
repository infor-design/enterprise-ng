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
  selector: 'soho-datagrid-content-demo',
  templateUrl: 'datagrid-content.demo.html',
  providers: [],
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

   toggleFilterRow() {
    this.dataGrid.toggleFilterRow();
  }

  busy() {}

  onSelected(e: any) {
  }
}
