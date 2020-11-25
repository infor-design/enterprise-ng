import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  DATA
} from './blockgrid-demo-data';

@Component({
  selector: 'app-blockgrid-mixed-selection-demo',
  templateUrl: 'blockgrid-mixed-selection.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridMixedSelectionDemoComponent {
  constructor() {
  }

  public data = DATA;

  onSelected(args: any) {
    console.log('onSelected', args);
  }

  onDeselected(args: any) {
    console.log('onDeselect', args);
  }

  onActivated(args: any) {
    console.log('onActivated', args);
  }

  onDeactivated(args: any) {
    console.log('onDeactivated', args);
  }
}
