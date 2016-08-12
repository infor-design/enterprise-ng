import { Component } from '@angular/core';
import { SohoMenuButtonComponent } from '../../components/menu-button';

@Component({
  selector: 'soho-menu-button-demo',
  templateUrl: 'menu-button.demo.html',
  directives: [ SohoMenuButtonComponent ]
})

export class MenuButtonDemoComponent {
  constructor() { }
}
