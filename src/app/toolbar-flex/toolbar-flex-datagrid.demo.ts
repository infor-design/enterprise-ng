import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataGridDemoService } from '../datagrid/datagrid-demo.service';

import { SohoDataGridService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-toolbar-flex-datagrid-demo',
  templateUrl: 'toolbar-flex-datagrid.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarFlexDatagridDemoComponent {
  onSelected(event: any) {
    let data = '';
    if (event.item.type === 'actionbutton' || event.item.type === 'menubutton') {
      data = event.item.selectedAnchor[0].dataset.action;
    } else {
      data = event.item.element.dataset.action;
    }
    alert(data);
  }
}
