import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SohoMenuButtonComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-menu-button-demo',
  templateUrl: 'menu-button.demo.html',
})
export class MenuButtonDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('ajax', { static: true })ajaxMenuButton: SohoMenuButtonComponent;
  public menuButtons: Array<any>;

  public showLastOption: boolean;
  public toggle: boolean;
  public isDisabled: boolean;

  private SUBMENU_RESPONSE_HTML = `
    <li><a href="#" id="SubOptionOne" data-action="AJAX sub-option 1">AJAX sub-option 1</a></li>
    <li><a href="#" id="SubOptionTwo" data-action="AJAX sub-option 2">AJAX sub-option 2</a></li>
    <li><a href="#" id="SubOptionThree" data-action="AJAX sub-option 3">AJAX sub-option 3</a></li>
  `;

  toggleBtn() {
    this.toggle = !this.toggle;
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

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

  ajaxMenuItems = (fn: AjaxBeforeOpenResponseFunction, options: any) => {
    if (options.hasOwnProperty('contextElement')) {
      fn(this.SUBMENU_RESPONSE_HTML);
    } else {
      const ajaxMenuItemList = [
        { label: 'Ajax Option #1' },
        { label: 'Ajax Option #2' },
        { label: 'Ajax Option #3' },
      ];

      let content = '';
      ajaxMenuItemList.forEach(item => {
        content += `
            <li>
              <a href="#">${item.label}</a>
            </li>
            `;
      });
      content += `
            <li class="submenu">
              <a href="#">Ajax Option #4</a>
               <ul class="popupmenu"></ul>
            </li>
            `;
      fn(content);
    }
   }

  ngOnInit() {
    this.showLastOption = true;
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
