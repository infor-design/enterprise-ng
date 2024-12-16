import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
// @ts-ignore
import { SohoDataGridService } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoTreeService } from 'ids-enterprise-ng';

import { TreeDemoService } from '../tree/tree-demo.service';
import { DataGridDemoService } from '../datagrid/datagrid-demo.service';

@Component({
    selector: 'app-splitter-vertical-demo',
    templateUrl: 'splitter-vertical.demo.html',
    providers: [
        { provide: SohoDataGridService, useClass: DataGridDemoService },
        { provide: SohoTreeService, useClass: TreeDemoService }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SplitterVerticalDemoComponent {

}
