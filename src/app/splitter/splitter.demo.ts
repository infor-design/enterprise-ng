import {
  Component,
  AfterContentInit,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { TreeDemoService } from '../tree/tree-demo.service';
import { DataGridDemoService } from '../datagrid/datagrid-demo.service';
import { DataGridToolbarDemoComponent } from '../datagrid/datagrid-toolbar.demo';
import { SohoButtonComponent } from '../../components/button';

import {
  SohoDataGridComponent,
  SohoDataGridService,
} from '../../components/datagrid';

import {
  SohoTreeComponent,
  SohoTreeService
} from '../../components/tree';

@Component({
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
