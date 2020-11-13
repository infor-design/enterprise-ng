import { Component } from '@angular/core';

@Component({
  selector: 'app-popupmenu-demo',
  templateUrl: 'popupmenu.demo.html',
})
export class PopupMenuDemoComponent {

  public isInsertCommentDisabled = true;
  public isInsertNoteDisabled = true;
  public insertCommentText = 'Enable';
  public insertNoteText = 'Enable';

  public options = {
    autoRefresh: true,
    showLabel: true,
    showAxis: false,
    autoScale: false,
  };

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

  onBeforeOpen(_event: SohoPopupMenuEvent) {
    console.log('PopupMenu Demo: popupmenu.onBeforeOpen');
  }

  onClose(_event: SohoPopupMenuEvent) {
    console.log('PopupMenu Demo: popupmenu.onClose');
  }

  onOpen(_event: SohoPopupMenuEvent) {
    console.log('PopupMenu Demo: popupmenu.onOpen');
  }

  toggleOption(option: string) {
    // @ts-ignore
    this.options[option] = !this.options[option];
  }
}
