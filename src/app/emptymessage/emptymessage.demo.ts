import { Component } from '@angular/core';

/**
 * This example:
 * - shows basic empty message component
 */
@Component({
  selector: 'app-emptymessage-demo',
  templateUrl: 'emptymessage.demo.html'
})
export class EmptyMessageDemoComponent {

  public buttonSettings = {
    id: 'test',
    text: 'Retry',
    click: () => {
      alert('Do the thing');
    }
  };
}
