import { Component } from '@angular/core';

@Component({
  selector: 'soho-toolbar-more-actions-ajax-demo',
  templateUrl: './toolbar-more-actions-ajax.demo.html'
})

export class ToolbarMoreActionsAjaxDemoComponent {

  private MENU_RESPONSE_HTML = `
    <li><a href="#" id="AJAXOptionOne" data-action="AJAX Option 1">AJAX Option 1</a></li>
    <li><a href="#" id="AJAXOptionTwo" data-action="AJAX Option 2">AJAX Option 2</a></li>
    <li class="submenu">
      <a href="#" id="AJAXOptionThree" data-action="AJAX Option 3">AJAX Option 3</a>
      <ul class="popupmenu"></ul>
    </li>
    <li><a href="#" id="AJAXOptionFour" data-action="AJAX Option 4">AJAX Option 4</a></li>
  `;

  private SUBMENU_RESPONSE_HTML = `
    <li><a href="#" id="SubOptionOne" data-action="AJAX sub-option 1">AJAX sub-option 1</a></li>
    <li><a href="#" id="SubOptionTwo" data-action="AJAX sub-option 2">AJAX sub-option 2</a></li>
    <li><a href="#" id="SubOptionThree" data-action="AJAX sub-option 3">AJAX sub-option 3</a></li>
  `;

  onSelected(event) {
    const data = event.event.currentTarget.dataset.action;
    alert(data);
  }

  onBeforeContextMenuOpen = (response: AjaxBeforeOpenResponseFunction, options: any) => {
    if (options.hasOwnProperty('contextElement')) {
      response(this.SUBMENU_RESPONSE_HTML);
      return;
    } else {
      response(this.MENU_RESPONSE_HTML);
      return;
    }
  }
}
