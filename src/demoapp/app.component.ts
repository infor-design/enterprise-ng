import { Component } from '@angular/core';
import { SoHoIconComponent, SoHoIconExtendedComponent } from './';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives : [
    SoHoIconComponent,
    SoHoIconExtendedComponent,
    ROUTER_DIRECTIVES,
  ],
})
export class AppComponent {
  title = 'SoHo Xi Controls in Angular 2!';
}
