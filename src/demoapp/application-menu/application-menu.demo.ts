import { Component, HostBinding } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { ApplicationMenuComponent } from '../../components';

@Component({
  moduleId: module.id,
  selector: 'soho-application-menu-demo',
  templateUrl: 'application-menu.demo.html',
  directives: [ROUTER_DIRECTIVES, ApplicationMenuComponent]
})
export class ApplicationMenuDemo {
  @HostBinding('class') get classes() {
    return 'application-menu is-open no-transition';
  }
}
