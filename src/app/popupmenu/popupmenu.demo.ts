import { Component } from '@angular/core';

@Component({
  selector: 'soho-popupmenu-demo',
  templateUrl: 'popupmenu.demo.html',
})
export class PopupMenuDemoComponent {

  private isInsertCommentDisabled = true;
  private isInsertNoteDisabled = true;
  private insertCommentText = 'Enable';
  private insertNoteText = 'Enable';

  onInsertCommentButtonClicked() {
    this.isInsertCommentDisabled = !this.isInsertCommentDisabled;
    this.insertCommentText = this.isInsertCommentDisabled ? 'Enable' : 'Disable';
  }

  onInsertNoteClicked() {
    this.isInsertNoteDisabled = !this.isInsertNoteDisabled;
    this.insertNoteText = this.isInsertNoteDisabled ? 'Enable' : 'Disable';
  }

  onSelected() {
    console.log('onSelected');
  }

  onBeforeopen() {
    console.log('onBeforeopen');
  }

  onClose() {
    console.log('onClose');
  }

  onOpen() {
    console.log('onOpen');
  }
}
