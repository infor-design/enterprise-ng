import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SohoApplicationMenuComponent } from '../../components/application-menu';
@Component({
  selector: 'soho-application-menu-demo',
  templateUrl: 'application-menu.demo.html',
  directives: [ROUTER_DIRECTIVES, SohoApplicationMenuComponent]
})
export class SohoApplicationMenuDemoComponent {
}
