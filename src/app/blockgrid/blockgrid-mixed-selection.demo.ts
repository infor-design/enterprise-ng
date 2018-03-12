import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  DATA
} from './blockgrid-demo-data';

@Component({
  selector: 'soho-blockgrid-mixed-selection.demo',
  templateUrl: './blockgrid-mixed-selection.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridMixedSelectionDemoComponent {
  constructor(private elementRef: ElementRef) {
  }

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
