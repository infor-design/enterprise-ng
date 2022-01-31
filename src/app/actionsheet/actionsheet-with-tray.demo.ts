import {
  AfterViewInit,
  Component,
} from '@angular/core';


@Component({
  selector: 'app-actionsheet-with-tray-demo',
  templateUrl: './actionsheet-with-tray.demo.html'
})
export class ActionsheetWithTrayDemoComponent implements AfterViewInit {

  actions: SohoActionsheetActions[] = [
    { icon: 'mail', text: 'Email' },
    { icon: 'user-profile', text: 'Go to Profile' },
    { icon: 'workflow', text: 'Share' },
    { icon: 'user-status-do-not-disturb', text: 'Remove' }
  ];

  trayOpts: SohoActionsheetTrayOptions = {
    text: 'Cashier - Clocked In at 8:59 AM',
    icon: 'clock',
    backgroundColor: 'ruby'
  }

  attributes: Array<Object> | Object = [
    { name: 'id', value: 'my-actions' },
    { name: 'data-automation-id', value: 'my-actions' }
  ];

  breakpoint = 'phone-to-tablet';

  constructor() {}

  ngAfterViewInit() { }
}
