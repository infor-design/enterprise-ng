import { Component } from '@angular/core';
import { SohoMenuButtonComponent } from '../';

@Component({
  moduleId: module.id,
  selector: 'soho-menu-button-demo',
  templateUrl: 'menu-button.demo.html',
  directives: [ SohoMenuButtonComponent ]
})

export class MenuButtonDemoComponent {
  constructor() { }
}
