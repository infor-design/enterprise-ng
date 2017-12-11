import { Component, QueryList, ViewChildren } from '@angular/core';
import { SohoAlertDirective } from '../../soho/alert';

/**
 * This example:
 * - shows basic alert functionality on input elements with an angular template
 */
@Component({
  selector:    'soho-alert-demo',
  templateUrl: 'alert.demo.html'
})
export class AlertDemoComponent {
  @ViewChildren(SohoAlertDirective) alerts: QueryList<SohoAlertDirective>;

  private message = 'Message is ';
  private currentValidationType: SohoAlertType = 'error';

  public onChange(event: Event) {
    const element = $(event.currentTarget);
    this.currentValidationType = <SohoAlertType>element.val();
  }

  addMessage() {
    this.alerts.forEach((alert: SohoAlertDirective) => {
      alert.addInlineMessage(this.message + this.currentValidationType, this.currentValidationType);
    });
  }

  removeMessage() {
    this.alerts.forEach((alert: SohoAlertDirective) => {
      alert.removeMessage(this.currentValidationType);
    });
  }

  removeAllMesssages() {
    this.alerts.forEach((alert: SohoAlertDirective) => {
      alert.removeAllMessages();
    });
  }
}
