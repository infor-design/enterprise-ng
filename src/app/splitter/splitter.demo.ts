import {
  Component,
  AfterContentInit,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { TreeDemoService } from '../tree/tree-demo.service';
import { DataGridDemoService } from '../datagrid/datagrid-demo.service';

import {
  SohoDataGridService,
} from '../../components/datagrid';

import {
  SohoTreeService
} from '../../components/tree';

@Component({
  selector: 'splitter-demo',
  templateUrl: 'splitter.demo.html',
  providers: [
    { provide: SohoDataGridService, useClass: DataGridDemoService },
    { provide: SohoTreeService, useClass: TreeDemoService }],
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
