import { Component } from '@angular/core';

import {
  SohoMessageService,
  SohoMessageRef
} from 'ids-enterprise-ng';
import { timer } from 'rxjs';

@Component({
  selector: 'app-message-demo',
  templateUrl: 'message.demo.html'
})
export class MessageDemoComponent {
  /** The message dialog reference. */
  dialog?: SohoMessageRef;

  /** The result. */
  closeResult?: string;

  /**
   * Constructor.
   *
   * @param messageService - the message dialog service.
   */
  constructor(private messageService: SohoMessageService) {
  }

  openError() {
    const buttons = [
      { text: 'Restart Now', click: (_e: any, modal: any) => { modal.close(true); (this.dialog as any) = null; }, isDefault: true }
    ];

    this.dialog = this.messageService
      .error()
      .title('<span>Application Error</span>')
      .message(`This application has experienced a system error due to the lack of internet access.
                Please restart the application in order to proceed.`)
      .buttons(buttons)
      .open();
  }

  openAlert() {
    const buttons = [
      {
        text: 'Acknowledge', click: (_e: any, modal: any) => {
          this.closeResult = 'Acknowledge';
          (this.dialog as any) = null;
          modal.close(true);
        }, isDefault: true
      },
      {
        text: 'Cancel', click: (_e: any, modal: any) => {
          this.closeResult = 'Cancel';
          (this.dialog as any) = null; modal.close(true);
        }
      }];

    this.dialog = this.messageService
      .alert()
      .title('<span>Application Alert</span>')
      .message(`This application has experienced a security alert. Please acknowledge the alert to proceed or cancel to abort.`)
      .buttons(buttons)
      .open();
  }

  openConfirm() {
    const buttons = [
      {
        text: 'Cancel', click: (_e: any, modal: any) => {
          this.closeResult = 'Cancel'; (this.dialog as any) = null; modal.close(true);
        }, isDefault: true
      },
      { text: 'Remove', click: (_e: any, modal: any) => { this.closeResult = 'Remove'; (this.dialog as any) = null; modal.close(true); } }];

    this.dialog = this.messageService
      .confirm()
      .title('<span>Application Confirmed</span>')
      .message('<span>Success! You did the thing.</span>')
      .buttons(buttons)
      .open();
  }

  openComplete() {
    const buttons = [{
      text: 'Done',
      click: (_e: any, modal: any) => {
        this.closeResult = 'Done';
        (this.dialog as any) = null;
        modal.close(true);
      },
      isDefault: true
    }];

    this.dialog = (this.messageService as any)
      .message()
      .title('<span>File Upload Complete</span>')
      .message(`<span class="message">
          Your file "photo.png" was successfully uploaded to your personal folder and is now public for viewing.
        </span>`)
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

  openConfirmation() {
    const buttons = [
      {
        text: 'Yes', click: (_e: any, modal: any) => {
          this.closeResult = 'Yes'; (this.dialog as any) = null; modal.close(true);
        }, isDefault: true
      },
      { text: 'No', click: (_e: any, modal: any) => { this.closeResult = 'No'; (this.dialog as any) = null; modal.close(true); } }];

    this.dialog = (this.messageService as any)
      .message()
      .title('<span>Delete this Application?</span>')
      .message('<span class="message">You are about to delete this application permanently. Would you like to proceed?</span>')
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

  openAndCloseProgramatically() {
    const buttons = [{
      text: 'Done',
      click: (_e: any, modal: any) => {
        this.closeResult = 'Done';
        (this.dialog as any) = null;
        modal.close(true);
      },
      isDefault: true
    }];

    this.dialog = (this.messageService as any)
      .message()
      .title('<span>File Upload Complete</span>')
      .message(`<span class="message">
          Your file "photo.png" was successfully uploaded to your personal folder and is now public for viewing.
        </span>`)
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

    this.closeDialogProgramatically();
  }

  closeDialogProgramatically() {
    timer(3000).subscribe(() => {
      if (this.dialog) {
        console.log('programaticallyClosed');
        this.dialog.close();
        (this.dialog as any) = null;
      }
    });
  }

}
