import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { TreeDemoService } from '../tree/tree-demo.service';
import { DataGridDemoService } from '../datagrid/datagrid-demo.service';

import { SohoDataGridService } from '@infor/sohoxi-angular';
import { SohoTreeService } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-splitter-horizontal-demo',
  templateUrl: 'splitter-horizontal.demo.html',
  providers: [
    { provide: SohoDataGridService, useClass: DataGridDemoService },
    { provide: SohoTreeService, useClass: TreeDemoService }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitterHorizontalDemoComponent {
}
