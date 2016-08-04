import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoButtonComponent
} from '../';

@Component({
  moduleId: module.id,
  selector: 'sample-datagrid',
  templateUrl: 'datagrid-content-demo.component.html',
  providers: [],
  directives: [SohoDataGridComponent, SohoButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
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
