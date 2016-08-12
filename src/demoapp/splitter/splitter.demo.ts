import {
  Component,
  AfterContentInit,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SohoButtonComponent,
  SohoDataGridComponent,
  SohoDataGridService,
  SohoTreeComponent,
  SohoTreeService
} from '../../components';

import { TreeDemoService } from '../tree/tree-demo.service';

import { DataGridDemoService } from '../datagrid/datagrid-demo.service';
import { DataGridToolbarDemoComponent } from '../datagrid/datagrid-toolbar.demo';

@Component({
  moduleId: module.id,
  selector: 'splitter-demo',
  templateUrl: 'splitter.demo.html',
  providers: [
    { provide: SohoDataGridService, useClass: DataGridDemoService },
    { provide: SohoTreeService, useClass: TreeDemoService }],
  directives: [SohoTreeComponent, SohoDataGridComponent, SohoButtonComponent, DataGridToolbarDemoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitterDemoComponent implements AfterContentInit, AfterViewInit {
  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    jQuery('.splitter').splitter();
  }

  onSelected(e: any) {
  }
}
