import { Component } from '@angular/core';

@Component({
  selector: 'soho-toolbar-more-actions-ajax-demo',
  templateUrl: './toolbar-more-actions-ajax.demo.html'
})

export class ToolbarMoreActionsAjaxDemoComponent {

  private MENU_RESPONSE_HTML = '' +
    '<li><a href="#" id="OptionOne" data-action="Pre-defined option 1">Pre-defined option 1</a></li>' +
    '<li><a href="#" id="OptionTwo" data-action="Pre-defined option 2">Pre-defined option 2</a></li>' +
    '<li class="submenu">' +
    '<a href="#" id="OptionThree" data-action="Pre-defined option 3">Pre-defined option 3</a>' +
    '<ul class="popupmenu"></ul>' +
    '</li>' +
    '<li><a href="#" id="OptionFour" data-action="Pre-defined option 4">Pre-defined option 4</a></li>' +
    '';

  private SUBMENU_RESPONSE_HTML = '' +
    '<li><a href="#" id="SubOptionOne" data-action="Pre-defined sub-option 1">Pre-defined sub-option 1</a></li>' +
    '<li><a href="#" id="SubOptionTwo" data-action="Pre-defined sub-option 2">Pre-defined sub-option 2</a></li>' +
    '<li><a href="#" id="SubOptionThree" data-action="Pre-defined sub-option 3">Pre-defined sub-option 3</a></li>' +
    '';

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
