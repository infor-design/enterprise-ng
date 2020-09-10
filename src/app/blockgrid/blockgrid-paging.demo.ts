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
  selector: 'app-blockgrid-paging-demo',
  templateUrl: 'blockgrid-paging.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridPagingDemoComponent {

  constructor(private elementRef: ElementRef) {
  }

  public data = DATA;

  onSelected(args) {
    console.log('onSelected', args);
  }

  onDeselected(args) {
    console.log('onDeselect', args);
  }

  onPage(args) {
    console.log('onPage', args);
  }

  onPageSizeChange(args) {
    console.log('onPageSizeChange', args);
  }
}
