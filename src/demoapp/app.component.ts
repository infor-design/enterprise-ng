import {Component, HostBinding} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SoHoIcon, SoHoIconExtended} from "../components";
import {MastheadDemo} from "./masthead/masthead.demo";
import {HeaderDemo} from "./header/header.demo";
import {ApplicationMenuDemo} from "./application-menu/application-menu.demo";

@Component({
  moduleId: module.id,
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives : [
    SoHoIcon, SoHoIconExtended, MastheadDemo, ApplicationMenuDemo, HeaderDemo, ROUTER_DIRECTIVES
  ],
})
export class AppComponent {
  title = 'SoHo Xi Controls in Angular 2!';

  @HostBinding('class') get classes() {
    return 'no-scroll';
  }
}
