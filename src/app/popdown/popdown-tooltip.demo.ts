import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import {
  SohoPopDownDirective,
} from 'ids-enterprise-ng';

@Component({
  selector: 'app-popdown-tooltip-demo',
  templateUrl: 'popdown-tooltip.demo.html',
})
export class PopDownTooltipDemoComponent implements AfterViewInit {

  @ViewChild(SohoPopDownDirective, { static: false }) popdown?: SohoPopDownDirective;

  ngAfterViewInit(): void { }

  onClickPopdown(): void {
    if (this.popdown) {
      this.popdown.open();
    }
  }

  getBeforeShowTooltipCallback() {
    console.log('haha');
    return (response: (content: string) => void): void => {
      setTimeout(() => {
        response('TOOLTIP');
      }, 500);
    };
  }

  lines = [1, 2, 3];
}
