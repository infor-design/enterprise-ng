import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-hyperlink-demo',
  templateUrl:'./hyperlink.demo.html'
})
export class HyperlinkDemoComponent implements OnInit {

  private url1: string = '#'; // tslint:disable-line
  private url2: string = 'http://www.google.com'; // tslint:disable-line
  private isDisabled: boolean = true; // tslint:disable-line

  constructor() { }
  ngOnInit() {}

}
