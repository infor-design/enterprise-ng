import { Component } from '@angular/core';
import { Route, RouterConfig, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives : [
    ROUTER_DIRECTIVES,
  ],
})
export class AppComponent {
  title = 'SoHo Xi Controls in Angular 2!';
}
