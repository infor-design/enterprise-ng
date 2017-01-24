import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-hyperlink-demo',
  templateUrl: './hyperlink.demo.html'
})
export class HyperlinkDemoComponent implements OnInit {

  public url1: string = '#';
  public url2: string = 'http://www.google.com';
  public isDisabled: boolean = true;

  constructor() { }
  ngOnInit() {}

}
