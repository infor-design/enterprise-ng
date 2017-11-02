import {
  Component,
  HostBinding,
  Input } from '@angular/core';

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

    return tmp;
  }

  @HostBinding('class.widget') isWidget = true;

  @Input() widgetWidth: WidgetSize;
  @Input() widgetHeight: WidgetSize | 'auto';
}
