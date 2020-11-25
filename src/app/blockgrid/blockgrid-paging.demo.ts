import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  DATA
} from './blockgrid-demo-data';

@Component({
  selector: 'app-blockgrid-paging-demo',
  templateUrl: 'blockgrid-paging.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridPagingDemoComponent {

  constructor() {
  }

  public data = DATA;

  onSelected(args: any) {
    console.log('onSelected', args);
  }

  onDeselected(args: any) {
    console.log('onDeselect', args);
  }

  onPage(args: any) {
    console.log('onPage', args);
  }

  onPageSizeChange(args: any) {
    console.log('onPageSizeChange', args);
  }
}
