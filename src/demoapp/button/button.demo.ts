import { Component, OnInit } from '@angular/core';
import { SoHoButtonComponent, BUTTON_TYPES } from '../';

@Component({
  moduleId: module.id,
  selector: 'soho-button-demo',
  templateUrl: 'button.demo.html',
  directives: [ SoHoButtonComponent ],
})
export class ButtonDemoComponent implements OnInit {
  private types = BUTTON_TYPES; // tslint:disable-line
  private shouldSayHi = false;

  constructor() {}
  ngOnInit() {}
  toggleHello() {
    this.shouldSayHi = !this.shouldSayHi;
  }
}
