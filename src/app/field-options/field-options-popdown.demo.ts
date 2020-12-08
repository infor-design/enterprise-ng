import {
  Component,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoPopDownDirective } from 'ids-enterprise-ng';

/**
 * This example shows clicking on an entry in an ajax build context menu, opening up
 * a popdown
 */
@Component({
  selector:    'app-field-options-popdown-demo',
  templateUrl: 'field-options-popdown.demo.html'
})
export class FieldOptionsPopdownDemoComponent {

  @ViewChild(SohoPopDownDirective, { static: true }) popdown?: SohoPopDownDirective;

  private MENU_RESPONSE_HTML = '' +
    '<li><a href="#" id="ShowFieldHistory">Show Field History</a></li>' +
    '<li><a href="#" id="ShowPendingChanges">Show Pending Changes</a></li>' +
    '';

  public TABLE = {
    headers: ['Date', 'Value', 'User ID', 'Name'],
    data: [['5/12/2010', 'Drew', '1075', '1075']]
  };

  constructor() {
  }

  onSelected($event: any) {
    const buttonId = $event.args[0].id;
    if (buttonId === 'ShowFieldHistory') {
      if (this.popdown) {
        this.popdown.open();
      }
    } else {
      alert(buttonId + ' clicked');
    }
  }

  onBeforeContextMenuOpen = (response: AjaxBeforeOpenResponseFunction, _options: any) => {
    response(this.MENU_RESPONSE_HTML);
    return;
  }
}
