import {
  Component,
  HostBinding,
  Input
} from '@angular/core';

export type WidgetSize = 'single' | 'double' | 'triple' | 'quad';

@Component({
  selector: 'div[soho-widget]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
})
export class SohoWidgetComponent {
  @HostBinding('class') get classList(): string {
    let tmp = '';

    if (this.widgetWidth && this.widgetWidth !== 'single') {
      tmp += this.widgetWidth + '-width';
    }

    if (this.widgetHeight && this.widgetHeight !== 'single') {
      tmp += tmp ? ' ' : '';
      tmp += this.widgetHeight + '-height';
    }

    if (this.removable != null && this.removable !== true) {
      tmp += tmp ? ' ' : '';
      tmp += 'no-remove';
    }

    return tmp;
  }

  @HostBinding('class.widget') isWidget = true;

  @Input() widgetWidth: WidgetSize;
  @Input() widgetHeight: WidgetSize | 'auto';
  @Input() removable: boolean;
}
