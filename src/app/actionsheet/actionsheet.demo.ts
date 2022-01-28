import {
  AfterViewInit,
  Component,
} from '@angular/core';


@Component({
  selector: 'app-actionsheet-demo',
  templateUrl: './actionsheet.demo.html'
})
export class ActionsheetDemoComponent implements AfterViewInit {

  private jQueryElement!: JQuery;

  actions: SohoActionsheetActions[] = [
    { icon: 'mail', text: 'Email' },
    { icon: 'user-profile', text: 'Go to Profile' },
    { icon: 'workflow', text: 'Share' },
    { icon: 'user-status-do-not-disturb', text: 'Remove' }
  ];

  attributes: Array<Object> | Object = [
    { name: 'id', value: 'my-actions' },
    { name: 'data-automation-id', value: 'my-actions' }
  ];

  breakpoint = 'phone-to-tablet';

  constructor() {}

  ngAfterViewInit() { }
}
