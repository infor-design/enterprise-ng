import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoDataGridService } from 'ids-enterprise-ng';
import { SohoTreeService } from 'ids-enterprise-ng';

import { TreeDemoService } from '../tree/tree-demo.service';
import { DataGridDemoService } from '../datagrid/datagrid-demo.service';

@Component({
  selector: 'soho-splitter-vertical-demo',
  templateUrl: './splitter-vertical.demo.html',
  providers: [
    { provide: SohoDataGridService, useClass: DataGridDemoService },
    { provide: SohoTreeService, useClass: TreeDemoService }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitterVerticalDemoComponent {

}
