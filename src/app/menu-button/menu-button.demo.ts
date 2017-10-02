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
    // Context lost. this is no longer an Angular component.
    // Not able to project content and get ElementRef's innerHTML

    let ajaxMenuItemList = [
      {label: 'Ajax Option #1'},
      {label: 'Ajax Option #2'},
      {label: 'Ajax Option #3'},
    ];

    let content = '';
    ajaxMenuItemList.forEach(item =>{
      content += `
            <li>
              <a href="#">${item.label}</a>
            </li>
            `
    });
    fn(content);
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
