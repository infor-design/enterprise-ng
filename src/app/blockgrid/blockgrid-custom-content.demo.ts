import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  DATA
} from './blockgrid-demo-data';

@Component({
  selector: 'app-blockgrid-custom-content-demo',
  templateUrl: './blockgrid-custom-content.demo.html',
  styleUrls: ['./blockgrid-custom-content.demo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridCustomContentDemoComponent {

  public data = DATA;

  onSelected(args) {
    console.log('onSelected', args);
  }

  onDeselected(args) {
    console.log('onDeselect', args);
  }

  onActivated(args) {
    console.log('onActivated', args);
  }

  onDeactivated(args) {
    console.log('onDeactivated', args);
  }
}
