import { Component } from '@angular/core';

import {
  SohoMessageService,
  SohoMessageRef
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-message.demo',
  templateUrl: './message.demo.html'
})
export class MessageDemoComponent {
  /** The message dialog reference. */
  dialog: SohoMessageRef;

  /** The result. */
  closeResult: string;

  /**
   * Constructor.
   *
   * @param messageService - the message dialog service.
   */
  constructor(private messageService: SohoMessageService) {
  }

  openAlert() {
    const buttons = [
      { text: 'Cancel', click: (e, modal) => { this.closeResult = 'Cancel'; this.dialog = null; modal.close(true);  }, isDefault: true },
      { text: 'Remove', click: (e, modal) => { this.closeResult = 'Remove'; this.dialog = null; modal.close(true); } }];

    this.dialog = this.messageService
      .message()
      .title('<span>Confirmation</span>')
      .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
      .buttons(buttons)
      .beforeClose(() => {
         console.log('before close');
         return true;
      }).beforeOpen(() => {
         console.log('before open');
         return true;
      }).opened(() => {
         console.log('opened');
      })
      .open();
  }

  openError() {
    const buttons = [
      { text: 'Restart Now', click: (e, modal) => { modal.close(true); this.dialog = null; }, isDefault: true }
    ];

    this.dialog = this.messageService
      .error()
      .title('<span>Application Error</span>')
      .message(`This application has experienced a system error due to the lack of internet access.
                Please restart the application in order to proceed.`)
      .buttons(buttons)
      .open();
  }

}
