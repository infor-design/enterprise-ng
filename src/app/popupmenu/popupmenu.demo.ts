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

  onSelected(event: SohoPopupMenuEvent) {
    console.log('PopupMenu Demo: popupmenu.onSelected');
    $('body').toast({
      title: 'Selected',
      message: 'Popupmenu Item "' + $(event.args).text().trim() + '" selected.'
    });
  }

  onBeforeOpen(event: SohoPopupMenuEvent) {
    console.log('PopupMenu Demo: popupmenu.onBeforeOpen');
  }

  onClose(event: SohoPopupMenuEvent) {
    console.log('PopupMenu Demo: popupmenu.onClose');
  }

  onOpen(event: SohoPopupMenuEvent) {
    console.log('PopupMenu Demo: popupmenu.onOpen');
  }
}
