import { Component } from '@angular/core';
import { SohoButtonComponent, BUTTON_TYPES, SohoIconComponent } from '../.';

@Component({
  moduleId: module.id,
  selector: 'soho-icon-demo',
  templateUrl: 'icon.demo.html',
  directives: [ SohoButtonComponent, SohoIconComponent ]
})
export class IconDemoComponent {
  private types = BUTTON_TYPES; // tslint:disable-line
}
