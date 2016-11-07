import {
  Component, OnInit
} from '@angular/core';

@Component({
  selector: 'soho-hyperlink-demo',
  templateUrl: 'hyperlink.demo.html'
})

export class HyperlinkDemoComponent implements OnInit {

  private url1: string = '#';
  private url2: string = 'http://www.google.com';
  private isDisabled: boolean = true;

  constructor() { }
  ngOnInit() {}

}
