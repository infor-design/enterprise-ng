import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs-dismissible-demo',
  templateUrl: 'tabs-dismissible.demo.html'
})
export class TabsDismissibleDemoComponent {
  onBeforeClose(_event: any, tab: any) {
    if (tab.attr('href') === '#tabs-dismissible-ie') {
      console.log('can\'t dismiss this tab');
      return false;
    }
    return true;
  }
}
