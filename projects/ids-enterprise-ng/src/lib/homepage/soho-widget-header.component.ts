import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'div[soho-widget-header]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoWidgetHeaderComponent {
  @HostBinding('class.widget-header') isWidgetHeader = true;
}
