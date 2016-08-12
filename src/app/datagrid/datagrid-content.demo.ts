import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoDataGridComponent } from '../../components/datagrid';
import { SohoButtonComponent } from  '../../components/button';

@Component({
  selector: 'sample-datagrid',
  templateUrl: 'datagrid-content.demo.html',
  providers: [],
  directives: [SohoDataGridComponent, SohoButtonComponent],
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
