import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SoHoDataGridComponent,
  SoHoButtonComponent
} from '../';

@Component({
  moduleId: module.id,
  selector: 'sample-datagrid',
  templateUrl: 'datagrid-content-demo.component.html',
  providers: [],
  directives: [SoHoDataGridComponent, SoHoButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridContentDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SoHoDataGridComponent) dataGrid: SoHoDataGridComponent;

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

