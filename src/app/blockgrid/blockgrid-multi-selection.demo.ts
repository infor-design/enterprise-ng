import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  DATA
} from './blockgrid-demo-data';

@Component({
  selector: 'app-blockgrid-multi-selection-demo',
  templateUrl: 'blockgrid-multi-selection.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridMultiSelectionDemoComponent {
  constructor() {
  }

  public data = DATA;

  onSelected(args: any) {
    console.log('onSelected', args);
  }

  onDeselected(args: any) {
    console.log('onDeselect', args);
  }
}
