import {
  Component,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';

import { SohoArrangeDirective } from 'ids-enterprise-ng';

@Component({
    selector: 'app-arrange-demo',
    templateUrl: 'arrange.demo.html',
    standalone: false
})
export class ArrangeDemoComponent implements AfterViewInit {

  @ViewChildren(SohoArrangeDirective) arranges?: QueryList<SohoArrangeDirective>;

  constructor() {}
  ngAfterViewInit(): void {
    console.log('viewChildren', this.arranges);
  }

  onBeforeArrange(e: SohoArrangeEvent) {
    console.log('onBeforeArrange: ', e);
  }

  onArrangeUpdate(e: SohoArrangeEvent) {
    console.log('ArrangeUpdate: ', e);
  }

  onDrag(e: SohoArrangeEvent) {
    console.log('drag: ', e);
  }
}
