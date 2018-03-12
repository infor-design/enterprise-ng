import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  DATA
} from './blockgrid-demo-data';

@Component({
  selector: 'soho-blockgrid-multi-selection.demo',
  templateUrl: './blockgrid-multi-selection.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridMultiSelectionDemoComponent {
  constructor(private elementRef: ElementRef) {
  }

  public data = DATA;

  onSelected(args) {
    console.log('onSelected', args);
  }

  onDeselected(args) {
    console.log('onDeselect', args);
  }
}
