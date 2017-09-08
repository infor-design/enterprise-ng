import {
  Component,
  HostBinding,
  Input } from '@angular/core';

@Component({
  selector: 'div[soho-widget-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoWidgetTitleComponent {
  @HostBinding('attr.tabindex') @Input() tabIndex: number;
  @HostBinding('class.widget-title') isWidgetTitle = true;
}
