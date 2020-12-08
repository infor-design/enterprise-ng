import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-flex-more-actions-ajax-demo',
  templateUrl: 'toolbar-flex-more-actions-ajax.demo.html'
})

export class ToolbarFlexMoreActionsAjaxDemoComponent {

  private MENU_RESPONSE_HTML = `
    <li><a href="#" id="AJAXOptionOne" data-action="{'button':'AJAX Option 1'}">AJAX Option 1</a></li>
    <li><a href="#" id="AJAXOptionTwo" data-action="{'button':'AJAX Option 2'}">AJAX Option 2</a></li>
    <li class="submenu" id="ajaxsubmenu">
      <a href="#" id="AJAXOptionThree" data-action="{'button':'AJAX Option 3'}">AJAX Option 3</a>
      <ul class="popupmenu"></ul>
    </li>
    <li><a href="#" id="AJAXOptionFour" data-action="{'button':'AJAX Option 4'}">AJAX Option 4</a></li>
  `;

  private SUBMENU_RESPONSE_HTML = `
    <li><a href="#" id="SubOptionOne" data-action="{'button':'AJAX sub-option 1'}">AJAX sub-option 1</a></li>
    <li><a href="#" id="SubOptionTwo" data-action="{'button':'AJAX sub-option 2'}">AJAX sub-option 2</a></li>
    <li><a href="#" id="SubOptionThree" data-action="{'button':'AJAX sub-option 3'}">AJAX sub-option 3</a></li>
  `;

  private MENU_BUTTON_RESPONSE_HTML = `
    <li><a href="#" id="MenuButtonOptionOne" data-action="{'button':'Menu Button AJAX Option 1'}">Menu Button AJAX Option 1</a></li>
    <li><a href="#" id="MenuButtonOptionTwo" data-action="{'button':'Menu Button AJAX Option 2'}">Menu Button AJAX Option 2</a></li>
  `;

  onSelected(event: any) {
      let data = '';
      if (event.item.type === 'actionbutton' || event.item.type === 'menubutton') {
        data = event.item.selectedAnchor[0].dataset.action;
      } else {
        data = event.item.element.dataset.action;
      }
      alert(data);
  }

  onBeforeContextMenuOpen = (response: AjaxBeforeOpenResponseFunction, options: any) => {
    if (options.hasOwnProperty('contextElement')) {
      if (options.contextElement[0].parentElement.parentElement.id === 'menu-button') {
        response(this.MENU_BUTTON_RESPONSE_HTML);
        return;
      }
      response(this.SUBMENU_RESPONSE_HTML);
      return;
    } else {
      response(this.MENU_RESPONSE_HTML);
      return;
    }
  }

  onBeforeMenuButtonOpen = (response: AjaxBeforeOpenResponseFunction, _options: any) => {
    response(this.MENU_BUTTON_RESPONSE_HTML);
    return;
  }
}
