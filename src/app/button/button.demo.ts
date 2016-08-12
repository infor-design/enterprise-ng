import {
  Component,
  OnInit
} from '@angular/core';

import { SohoButtonComponent } from '../../components/button';

@Component({
  selector: 'soho-button-demo',
  templateUrl: 'button.demo.html',
  directives: [ SohoButtonComponent ]
})
export class ButtonDemoComponent implements OnInit {
  private shouldSayHi = false;

  constructor() {}
  ngOnInit() {}
  toggleHello() {
    this.shouldSayHi = !this.shouldSayHi;
  }
}
