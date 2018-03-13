import { Component } from '@angular/core';

@Component({
  selector: 'soho-tabs-dismissible-demo',
  templateUrl: './tabs-dismissible.demo.html'
})
export class TabsDismissibleDemoComponent {
  onBeforeClose(event, tab) {
    if ($(tab).children('a').attr('href') === '#tabs-dismissible-internetExplorer') {
      console.log('can\'t dismiss Internet Explorer');
      return false;
    }
  }
}
