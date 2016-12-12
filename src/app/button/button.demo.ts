import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-button-demo',
  templateUrl:'./button.demo.html'
})
export class ButtonDemoComponent implements OnInit {
  private shouldSayHi = false;

  constructor() {}
  ngOnInit() {}
  toggleHello() {
    this.shouldSayHi = !this.shouldSayHi;
  }
}
