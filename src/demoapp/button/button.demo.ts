import { Component, OnInit } from '@angular/core';
import { SohoButtonComponent, BUTTON_TYPES } from '../';

@Component({
  moduleId: module.id,
  selector: 'soho-button-demo',
  templateUrl: 'button.demo.html',
  directives: [ SohoButtonComponent ],
  styles: [`
    .code-tag {
      font-size: 12px;
      font-size: 1.2rem;
      background-color: #bdbdbd;
      border-radius: 2px;
      color: #383838;
      display: inline-block;
      height: 22px;
      line-height: 23px;
      margin: 20px 0 40px;
      padding: 0 10px;
      text-transform: uppercase;
    }
    .example-section {
      max-width: 980px;
      padding: 0 30px;
      margin: 0 auto;
    }
  `]
})
export class ButtonDemoComponent implements OnInit {
  private types = BUTTON_TYPES; // tslint:disable-line
  constructor() { }
  ngOnInit() { }
}
