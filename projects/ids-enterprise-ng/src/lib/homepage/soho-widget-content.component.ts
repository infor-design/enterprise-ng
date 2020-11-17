import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'div[soho-widget-content]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoWidgetContentComponent {
  @HostBinding('class.widget-content') isWidgetContent = true;
}
