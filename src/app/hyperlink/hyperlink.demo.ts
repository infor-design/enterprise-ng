import { Component } from '@angular/core';

@Component({
  selector: 'soho-hyperlink-demo',
  templateUrl: './hyperlink.demo.html'
})
export class HyperlinkDemoComponent {

  public url1 = '#';
  public url2 = 'http://www.google.com';
  public isDisabled = true;

  constructor() {
  }
}
