import { Component } from '@angular/core';

/**
 * This example:
 * - shows basic empty message component
 */
@Component({
    selector: 'app-emptymessage-demo',
    templateUrl: 'emptymessage.demo.html',
    standalone: false
})
export class EmptyMessageDemoComponent {

  buttonSettings: SohoEmptyMessageButtonOptions = {
    text: 'Retry',
    click: () => {
      alert('Do the thing');
    }
  };
}
