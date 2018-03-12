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
  selector: 'soho-blockgrid-single-selection.demo',
  templateUrl: './blockgrid-single-selection.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridSingleSelectionDemoComponent {

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
