import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  SohoMessageService,
  SohoMessageRef
} from '../../soho/message';

// import { ExampleModalDialogComponent } from './example-modal-dialog.component';
// import { NestedModalDialogComponent } from './nested-modal-dialog.component';
// import { VetoableModalDialogComponent } from './vetoable-modal-dialog.component';

@Component({
  selector: 'soho-message.demo',
  templateUrl: 'message.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDemoComponent {

  /**
   * The interface to an instantiated instance of the ExampeDialogComponent.
   */
  private dialog: SohoMessageRef;

  // private closeResult: string;

  /**
   * Constructor.
   *
   * @param messageService - the message dialog service.
   */
  constructor(private messageService: SohoMessageService) {
  }

  openAlert() {
    const buttons = [
      { text: 'Cancel', click: (e, modal) => { modal.close(true); }, isDefault: true },
      { text: 'Remove', click: (e, modal) => { modal.close(true); } }];

    this.dialog = this.messageService
      .message()
      .title('Delete')
      .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
      .buttons(buttons)
      .open();

    // // Attach a listener to the afterclose event, which also gives you the result - if available.
    // this.dialog.afterClose(result => {
    //   this.closeResult = result;
    //   this.dialog = null;
    // });
  }

  openError() {
    const buttons = [
      { text: 'Restart Now', click: (e, modal) => { modal.close(true); }, isDefault: true }
    ];

    this.dialog = this.messageService
      .error()
      .title('<span>Application Error</span>')
      .message(`This application has experienced a system error due to the lack of internet access.
                Please restart the application in order to proceed.`)
      .buttons(buttons)
      .open();

    // // Attach a listener to the afterclose event, which also gives you the result - if available.
    // this.dialog.afterClose(result => {
    //   this.closeResult = result;
    //   this.dialog = null;
    // });

  }

}
