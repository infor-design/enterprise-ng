import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SohoMenuButtonComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-menu-button-demo',
  templateUrl: './menu-button.demo.html',
})
export class MenuButtonDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('ajax')ajaxMenuButton: SohoMenuButtonComponent;
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

  ajaxMenuItems(fn: AjaxBeforeOpenResponseFunction) {
    fn('<li><a id="ajax-content-option-1" href="#">AJAX Option #1</a></li><li><a id="ajax-content-option-2" href="#">AJAX Option #2</a></li><li><a id="ajax-content-option-3" href="#">AJAX Option #3</a></li>');
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

  ngAfterViewInit() {
    this.ajaxMenuButton.ajaxBeforeOpenFunction = this.ajaxMenuItems;
  }
}
