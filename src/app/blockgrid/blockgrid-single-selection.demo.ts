import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  DATA
} from './blockgrid-demo-data';

@Component({
  selector: 'app-blockgrid-single-selection-demo',
  templateUrl: 'blockgrid-single-selection.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridSingleSelectionDemoComponent {

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
