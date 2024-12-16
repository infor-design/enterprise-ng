import { Component } from '@angular/core';

@Component({
    selector: 'app-hyperlink-demo',
    templateUrl: 'hyperlink.demo.html',
    standalone: false
})
export class HyperlinkDemoComponent {

  public url1 = '#';
  public url2 = 'http://www.google.com';
  public isDisabled = true;

  constructor() {
  }
}
