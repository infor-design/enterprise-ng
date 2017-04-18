import { Component } from '@angular/core';

@Component({
  selector: 'soho-popupmenu-demo',
  templateUrl: './popupmenu.demo.html',
})
export class PopupMenuDemoComponent {

  public isInsertCommentDisabled = true;
  public isInsertNoteDisabled = true;
  public insertCommentText = 'Enable';
  public insertNoteText = 'Enable';

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

  onBeforeOpen() {
    console.log('onBeforeOpen');
  }

  onClose() {
    console.log('onClose');
  }

  onOpen() {
    console.log('onOpen');
  }
}
