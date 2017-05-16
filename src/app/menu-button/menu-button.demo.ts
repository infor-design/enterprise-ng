import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'soho-menu-button-demo',
  templateUrl: './menu-button.demo.html',
})
export class MenuButtonDemoComponent implements OnInit {

  public menuButtons: Array<any>;

  disabledEntryClicked() {
    alert('Should not be Allowed');
  }

  onSelected(event: SohoContextMenuEvent) {
    console.log(event, 'onSelected');
  }

  onBeforeOpen(event: SohoContextMenuEvent) {
    console.log(event, 'onBeforeOpen');
  }

  onClose(event: SohoContextMenuEvent) {
    console.log(event, 'onClose');
  }

  onOpen(event: SohoContextMenuEvent) {
    console.log(event, 'onOpen');
  }

  ngOnInit() {
    this.menuButtons = [
      {
        label: 'Add',
        icon: 'add',
        menu: [
          { label: 'action one' },
          { label: 'action two' }
        ]
      },
      {
        label: 'Copy',
        icon: 'copy',
        menu: [
          { label: 'action one' },
          { label: 'action two' }
        ]
      }
    ];
  }
}
