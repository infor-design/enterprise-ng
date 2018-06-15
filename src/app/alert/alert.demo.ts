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

  public model: {
    date:          string,
    text:          string,
    outputField:   string,
    isAlert:       boolean,
    triggerEvents: boolean,
    type:          SohoAlertType,
    icon:          string
  } = {
    date:          '12/12/2016',
    text:          'abcdef',
    outputField:   '',
    isAlert:       false,
    triggerEvents: true,
    type:          'error',
    icon:          'mail'
  };
  showModel = true;
  showDefinedOptions = true;
  private types = ['error', 'alert', 'confirm', 'info', 'icon'];

  onError(event: SohoInputValidateEvent) {
    console.log([ 'onError', event.validation.field.getAttribute('id'), event.validation.message ]);
  }

  onAlert(event: SohoInputValidateEvent) {
    console.log([ 'onAlert', event.validation.field.getAttribute('id'), event.validation.message ]);
  }

  onConfirm(event: SohoInputValidateEvent) {
    console.log([ 'onConfirm', event.validation.field.getAttribute('id'), event.validation.message ]);
  }

  onIcon(event: SohoInputValidateEvent) {
    console.log([ 'onIcon', event.validation.field.getAttribute('id'), event.validation.message ]);
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
      const icon = (this.model.type === 'icon') ? this.model.icon : undefined;
      alert.addInlineMessage('Message' + alertText + ' type is ' + this.model.type,
        this.model.type, this.model.isAlert, this.model.triggerEvents, icon);
    });
  }

  getMessage() {
    let outputField = '';

    // for demo purposes, concatenate the displayed message(s) from each alert
    this.alerts.forEach((alert: SohoAlertDirective) => {
      const id = (alert.elementRef.nativeElement as Element).getAttribute('id');

      this.types.forEach( (type: SohoAlertType) => {
        const message = alert.getMessage(type);

        if (message !== undefined) {
          outputField += id + ' - ' + message + '\n';
        }
      });

      outputField += '\n';
    });

    this.model.outputField = outputField;
  }

  removeMessage() {
    this.alerts.forEach((alert: SohoAlertDirective) => {
      alert.removeMessage(this.model.type, this.model.triggerEvents);
    });
  }

  removeAllMesssages() {
    this.alerts.forEach((alert: SohoAlertDirective) => {
      alert.removeAllMessages(this.model.triggerEvents);
    });
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  // sets option properties to default values or to undefined to test the directive setting the defaults
  // (icon value of 'mail' is the default value for this demo only)
  toggleOptions() {
    this.showDefinedOptions = !this.showDefinedOptions;

    if (this.showDefinedOptions) {
      this.model.type = 'error';
      this.model.isAlert = false;
      this.model.triggerEvents = true;
      this.model.icon = 'mail';
    } else {
      this.model.type = undefined;
      this.model.isAlert = undefined;
      this.model.triggerEvents = undefined;
      this.model.icon = undefined;
    }
  }
}
