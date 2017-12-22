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

  public model = {
    date:        '12/12/2016',
    text:        'abcdef',
    outputField: '',
    isAlert:     false
  };
  showModel = true;

  private message = 'Message';
  private currentValidationType: SohoAlertType = 'error';

  onChange(event: Event) {
    const element = $(event.currentTarget);
    this.currentValidationType = element.val() as SohoAlertType;
  }

  onError(event: SohoInputValidateEvent) {
    console.log([ 'onError', event.validation.field.getAttribute('id'), event.validation.message ]);
  }

  onAlert(event: SohoInputValidateEvent) {
    console.log([ 'onAlert', event.validation.field.getAttribute('id'), event.validation.message ]);
  }

  onConfirm(event: SohoInputValidateEvent) {
    console.log([ 'onConfirm', event.validation.field.getAttribute('id'), event.validation.message ]);
  }

  onInfo(event: SohoInputValidateEvent) {
    console.log([ 'onInfo', event.validation.field.getAttribute('id'), event.validation.message ]);
  }

  onValid(event: SohoInputValidateEvent) {
    console.log([ 'onValid', event.validation.field.getAttribute('id'), event.validation.message ]);
  }

  addMessage() {
    this.alerts.forEach((alert: SohoAlertDirective) => {
      const alertText = (this.model.isAlert) ? ' is alert,' : '';
      alert.addInlineMessage(this.message + alertText + ' type is ' + this.currentValidationType,
        this.currentValidationType, this.model.isAlert);
    });
  }

  getMessage() {
    let outputField = '';

    // for demo purposes, concatenate the message(s) from each alert for display
    this.alerts.forEach((alert: SohoAlertDirective) => {
      const message = alert.getMessage(this.currentValidationType);

      if (message !== undefined) {
        outputField += message + '\n';
      }
    });

    this.model.outputField = outputField;
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

  toggleModel() {
    this.showModel = !this.showModel;
  }
}
